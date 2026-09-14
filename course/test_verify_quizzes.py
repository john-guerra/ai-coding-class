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


if __name__ == "__main__":
    unittest.main(verbosity=2)
