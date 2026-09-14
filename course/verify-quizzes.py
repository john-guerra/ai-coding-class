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
