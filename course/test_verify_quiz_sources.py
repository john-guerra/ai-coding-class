#!/usr/bin/env python3
"""Tests for verify-quiz-sources.py. Run: python3 course/test_verify_quiz_sources.py"""
import importlib.util, tempfile, unittest
from pathlib import Path

HERE = Path(__file__).parent
spec = importlib.util.spec_from_file_location("vqs", HERE / "verify-quiz-sources.py")
vqs = importlib.util.module_from_spec(spec)
spec.loader.exec_module(vqs)

KEY = """# Week 99 key

## Volatile Claims (re-verify before reuse)

| Q | Source | Quote |
|---|--------|-------|
| Q2 | https://example.com/a | New artifacts don't need to be published |
| Q8 | https://example.com/b | Everyone needs a Claude account |

## Something else
| Q9 | https://example.com/c | not part of the table |
"""


class TestParse(unittest.TestCase):
    def test_reads_only_the_volatile_claims_table(self):
        with tempfile.TemporaryDirectory() as tmp:
            p = Path(tmp) / "k.md"
            p.write_text(KEY)
            claims = vqs.parse_claims(p)
        self.assertEqual([c.qid for c in claims], ["Q2", "Q8"])
        self.assertEqual(claims[0].url, "https://example.com/a")


class TestMatch(unittest.TestCase):
    def test_curly_apostrophes_and_whitespace_still_match(self):
        page = "<p>New artifacts don’t   need to be <b>published</b> to store data.</p>"
        self.assertTrue(vqs.quote_present("New artifacts don't need to be published", page))

    def test_changed_wording_is_reported_missing(self):
        page = "<p>New artifacts must be published before they store data.</p>"
        self.assertFalse(vqs.quote_present("New artifacts don't need to be published", page))


if __name__ == "__main__":
    unittest.main()
