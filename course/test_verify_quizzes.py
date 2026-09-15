#!/usr/bin/env python3
"""Tests for verify-quizzes.py. Run: python3 course/test_verify_quizzes.py"""
import sys, tempfile, unittest, importlib.util
from pathlib import Path

HERE = Path(__file__).parent
spec = importlib.util.spec_from_file_location("vq", HERE / "verify-quizzes.py")
vq = importlib.util.module_from_spec(spec)
spec.loader.exec_module(vq)

QUIZ = """# Week 99: Test Quiz

| **Points** | 3 points |

## Questions

#### Q1: First Thing (1 point)
**Type:** Multiple Choice

What is the thing?

- A) Short one
- B) The correct and considerably longer option here
- C) Also short
- D) Brief

---

#### Q2: Second Thing (2 points)
**Type:** Multiple Choice

Which is it?

- A) An option of moderate length here
- B) Another option of moderate length
- C) A third option of moderate size
- D) A fourth option of moderate len
"""

KEY = """# Week 99 ANSWER KEY

| Question | Answer | Points | Topic |
|----------|--------|--------|-------|
| Q1 | B | 1 | First Thing |
| Q2 | A | 2 | Second Thing |
"""

CLEAN_QUIZ = """# Week 99: Clean Fixture

| **Points** | 3 points |

## Questions

#### Q1: Balanced One (1 point)
**Type:** Multiple Choice

Which statement is accurate?

- A) The cache is invalidated whenever a write occurs
- B) The cache is refreshed on a fixed timed interval
- C) The cache persists until the process is restarted
- D) The cache is discarded when memory pressure rises

---

#### Q2: Balanced Two (2 points)
**Type:** Multiple Choice

Which mechanism applies here?

- A) Requests are queued and retried with a backoff
- B) Requests are dropped once the buffer is saturated
- C) Requests are routed to a secondary replica set
- D) Requests are batched before the flush is issued
"""

CLEAN_KEY = """# Week 99 ANSWER KEY

| Question | Answer | Points | Topic |
|----------|--------|--------|-------|
| Q1 | B | 1 | Balanced One |
| Q2 | A | 2 | Balanced Two |
"""


def write(tmp, name, body):
    p = Path(tmp) / name
    p.write_text(body)
    return p


class TestParse(unittest.TestCase):
    def test_parses_questions_options_and_points(self):
        with tempfile.TemporaryDirectory() as tmp:
            qs = vq.parse_quiz(write(tmp, "q.md", QUIZ))
        self.assertEqual([q.qid for q in qs], ["Q1", "Q2"])
        self.assertEqual([q.points for q in qs], [1, 2])
        self.assertEqual(qs[0].options["A"], "Short one")
        self.assertEqual(set(qs[1].options), {"A", "B", "C", "D"})

    def test_loads_answer_key(self):
        with tempfile.TemporaryDirectory() as tmp:
            key = vq.load_key(write(tmp, "k.md", KEY))
        self.assertEqual(key, {"Q1": "B", "Q2": "A"})


class TestMeasure(unittest.TestCase):
    def test_flags_correct_answer_that_is_longest(self):
        with tempfile.TemporaryDirectory() as tmp:
            qs = vq.parse_quiz(write(tmp, "q.md", QUIZ))
            key = vq.load_key(write(tmp, "k.md", KEY))
        m = vq.measure(qs, key)
        self.assertEqual(m.n, 2)
        # Q1's correct answer (B) is the longest; Q2's (A) is not.
        self.assertEqual(m.longest_hits, 1)
        self.assertAlmostEqual(m.longest_rate, 0.5)
        self.assertGreater(m.mean_ratio, 1.0)

    def test_letter_spread_counts_correct_letters(self):
        with tempfile.TemporaryDirectory() as tmp:
            qs = vq.parse_quiz(write(tmp, "q.md", QUIZ))
            key = vq.load_key(write(tmp, "k.md", KEY))
        m = vq.measure(qs, key)
        self.assertEqual(m.letter_spread, {"A": 1, "B": 1, "C": 0, "D": 0})


MISMATCHED = QUIZ.replace("| **Points** | 3 points |", "| **Points** | 22 points |")


class TestHeaderPoints(unittest.TestCase):
    def test_matching_header_returns_equal_values(self):
        with tempfile.TemporaryDirectory() as tmp:
            claimed, actual = vq.check_header_points(write(tmp, "q.md", QUIZ))
        self.assertEqual((claimed, actual), (3, 3))

    def test_detects_the_week9_week10_mismatch_shape(self):
        with tempfile.TemporaryDirectory() as tmp:
            claimed, actual = vq.check_header_points(write(tmp, "q.md", MISMATCHED))
        self.assertEqual(claimed, 22)
        self.assertEqual(actual, 3)
        self.assertNotEqual(claimed, actual)

    def test_counts_questions_parse_quiz_drops(self):
        # week2 Q9 is a numeric-answer question: points, but no A-D options.
        # parse_quiz drops it; the header total must still include it.
        numeric = QUIZ + '''
---

#### Q3: Numeric Thing (4 points)
**Type:** Numeric Answer

How many?
'''
        with tempfile.TemporaryDirectory() as tmp:
            p = write(tmp, "q.md", numeric)
            self.assertEqual(len(vq.parse_quiz(p)), 2)   # Q3 dropped: no options
            claimed, actual = vq.check_header_points(p)
        self.assertEqual(actual, 7)                      # 1 + 2 + 4, Q3 counted


class TestMain(unittest.TestCase):
    def test_missing_header_row_yields_none_claimed(self):
        # Verifies check_header_points' claimed=None path, which main() branches
        # on via `pts_ok = claimed is None or claimed == actual`.
        with tempfile.TemporaryDirectory() as tmp:
            headerless = QUIZ.replace("| **Points** | 3 points |", "")
            claimed, actual = vq.check_header_points(write(tmp, "q.md", headerless))
        self.assertIsNone(claimed)
        self.assertEqual(actual, 3)

    def test_real_assessments_directory_is_scannable(self):
        # Week 2 was fixed in a85d8dc and must stay clean; it is the regression guard.
        quiz = vq.ASSESSMENTS / "week2-llm-fundamentals-quiz.md"
        key = vq.ASSESSMENTS / "week2-answer-key.md"
        if not quiz.exists() or not key.exists():
            self.skipTest("week2 source or gitignored answer key not present")
        m = vq.measure(vq.parse_quiz(quiz), vq.load_key(key))
        self.assertGreater(m.n, 0)
        self.assertLessEqual(m.longest_rate, vq.MAX_LONGEST_RATE)
        self.assertLessEqual(m.mean_ratio, vq.MAX_LENGTH_RATIO)


class TestMainExitCodes(unittest.TestCase):
    def setUp(self):
        self._saved = vq.ASSESSMENTS
        self._tmp = tempfile.TemporaryDirectory()
        vq.ASSESSMENTS = Path(self._tmp.name)
        (vq.ASSESSMENTS / "week99-fixture-quiz.md").write_text(CLEAN_QUIZ)
        (vq.ASSESSMENTS / "week99-answer-key.md").write_text(CLEAN_KEY)

    def tearDown(self):
        vq.ASSESSMENTS = self._saved
        self._tmp.cleanup()

    def test_returns_zero_when_every_quiz_passes(self):
        self.assertEqual(vq.main([]), 0)

    def test_returns_one_when_filter_matches_nothing(self):
        # A mistyped filter must fail loudly, never report a vacuous all-clear.
        self.assertEqual(vq.main(["Week404"]), 1)

    def test_filter_accepts_bare_and_prefixed_week_forms(self):
        for arg in ("99", "week99", "Week99"):
            with self.subTest(arg=arg):
                self.assertEqual(vq.main([arg]), 0)

    def test_returns_one_when_a_quiz_has_the_tell(self):
        # QUIZ is the demonstrates-the-defect fixture: Q1's correct answer is
        # the longest option. A gate that only ever returns 0 proves nothing.
        (vq.ASSESSMENTS / "week98-telling-quiz.md").write_text(QUIZ)
        (vq.ASSESSMENTS / "week98-answer-key.md").write_text(KEY)
        self.assertEqual(vq.main([]), 1)


if __name__ == "__main__":
    unittest.main(verbosity=2)
