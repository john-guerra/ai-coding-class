#!/usr/bin/env python3
"""Measure quiz answer-design defects across course/assessments/.

Catches the answer-length tell fixed in Week 2 (a85d8dc) and the header/points
mismatch found in Weeks 9 and 10: a correct answer that is reliably the longest
option lets a student score without knowing the material.

Usage: python3 course/verify-quizzes.py [week ...]
Exit:  0 all checks pass, 1 any quiz exceeds threshold.
"""
import re
import sys
from pathlib import Path
from typing import NamedTuple

HERE = Path(__file__).parent
ASSESSMENTS = HERE / "assessments"

MAX_LONGEST_RATE = 0.40
MAX_LENGTH_RATIO = 1.15


class Question(NamedTuple):
    qid: str
    points: int
    options: dict


def parse_quiz(path: Path) -> list:
    text = path.read_text()
    parts = re.split(r"^#### (Q\d+):[^\n(]*\((\d+) points?\)\s*$", text, flags=re.M)
    out = []
    for i in range(1, len(parts), 3):
        qid, pts, body = parts[i], int(parts[i + 1]), parts[i + 2]
        options = dict(re.findall(r"^-\s*([A-D])\)\s*(.+?)\s*$", body, flags=re.M))
        if len(options) >= 3:
            out.append(Question(qid, pts, options))
    return out


def load_key(path: Path) -> dict:
    if not path.exists():
        return {}
    return {
        m.group(1): m.group(2)
        for line in path.read_text().splitlines()
        if (m := re.match(r"\|\s*(Q\d+)\s*\|\s*([A-D])\s*\|", line.strip()))
    }


class Metrics(NamedTuple):
    n: int
    longest_hits: int
    longest_rate: float
    mean_ratio: float
    letter_spread: dict


def measure(questions: list, key: dict) -> Metrics:
    hits, ratios, letters = 0, [], []
    for q in questions:
        correct = key.get(q.qid)
        if not correct or correct not in q.options:
            continue
        letters.append(correct)
        clen = len(q.options[correct])
        # Safe because parse_quiz keeps only questions with 3+ lettered options,
        # so `others` always has 2+ entries. Hand-built Questions may not.
        others = [len(v) for k, v in q.options.items() if k != correct]
        if clen > max(others):
            hits += 1
        ratios.append(clen / (sum(others) / len(others)))
    n = len(ratios)
    return Metrics(
        n=n,
        longest_hits=hits,
        longest_rate=(hits / n) if n else 0.0,
        mean_ratio=(sum(ratios) / n) if n else 0.0,
        letter_spread={L: letters.count(L) for L in "ABCD"},
    )


def check_header_points(path: Path) -> tuple:
    """Compare the header's claimed total against every question heading.

    Counts headings directly rather than parse_quiz output: numeric and essay
    questions carry points but have no lettered options, so parse_quiz drops them.
    """
    text = path.read_text()
    m = re.search(r"\|\s*\*\*Points\*\*\s*\|\s*(\d+)\s*points?\s*\|", text)
    claimed = int(m.group(1)) if m else None
    headings = re.findall(r"^#### Q\d+:[^\n(]*\((\d+) points?\)", text, flags=re.M)
    return claimed, sum(int(p) for p in headings)


def week_of(path: Path) -> str:
    return re.match(r"(week\d+)", path.name).group(1)


def main(argv: list) -> int:
    quizzes = sorted(ASSESSMENTS.glob("week*-quiz.md"))
    if argv:
        wanted = {a.lstrip("w").lstrip("eek").zfill(2) for a in argv}
        quizzes = [q for q in quizzes if week_of(q)[4:].zfill(2) in wanted]
    failed = False
    print(f"{'quiz':<8} {'n':>3} {'longest':>12} {'ratio':>8}  {'pts':>9}  spread")
    print("-" * 74)
    for quiz in quizzes:
        week = week_of(quiz)
        questions = parse_quiz(quiz)
        key = load_key(ASSESSMENTS / f"{week}-answer-key.md")
        if not key:
            print(f"{week:<8} answer key missing — skipped")
            continue
        m = measure(questions, key)
        claimed, actual = check_header_points(quiz)
        pts_ok = claimed is None or claimed == actual
        bad = m.longest_rate > MAX_LONGEST_RATE or m.mean_ratio > MAX_LENGTH_RATIO or not pts_ok
        failed = failed or bad
        pts = f"{actual}" if pts_ok else f"{actual}!={claimed}"
        print(
            f"{week:<8} {m.n:>3} {m.longest_hits:>4}/{m.n:<3}({m.longest_rate*100:>3.0f}%)"
            f" {m.mean_ratio:>7.2f}x {pts:>9}  {m.letter_spread}"
            f"{'  <-- FAIL' if bad else ''}"
        )
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
