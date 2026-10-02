#!/usr/bin/env python3
"""Re-check that quiz questions about product behavior still match their sources.

Questions about how a product behaves (Claude.ai storage, sharing, plan limits)
go stale when the product ships. Each week's gitignored answer key lists those
questions in a "## Volatile Claims" table: | Q | Source URL | verbatim quote |.
This script fetches every source and reports any quote no longer on the page.

    python3 course/verify-quiz-sources.py [week ...]    # e.g. 5, or week05

Exit 0 = every quote still found; exit 1 = a quote is missing or a fetch failed.
Run it before reusing a quiz in a new offering and before each Canvas push.
"""
import html, re, sys, urllib.request
from dataclasses import dataclass
from pathlib import Path

ASSESSMENTS = Path(__file__).parent / "assessments"
TABLE_HEADING = re.compile(r"^## Volatile Claims", re.M)
ROW = re.compile(r"^\|\s*(Q\d+)\s*\|\s*(https?://\S+)\s*\|\s*(.+?)\s*\|\s*$", re.M)


@dataclass
class Claim:
    qid: str
    url: str
    quote: str


def parse_claims(path: Path) -> list:
    """Rows of the Volatile Claims table only — it ends at the next heading."""
    text = path.read_text()
    m = TABLE_HEADING.search(text)
    if not m:
        return []
    section = re.split(r"^## ", text[m.end():], maxsplit=1, flags=re.M)[0]
    return [Claim(*row) for row in ROW.findall(section)]


def _normalize(s: str) -> str:
    s = html.unescape(re.sub(r"<[^>]+>", " ", s))
    s = s.replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"')
    return re.sub(r"\s+", " ", s).strip().lower()


def quote_present(quote: str, page: str) -> bool:
    return _normalize(quote) in _normalize(page)


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (quiz source check)"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", errors="ignore")


def main(argv: list) -> int:
    keys = sorted(ASSESSMENTS.glob("week*-answer-key.md"))
    if argv:
        wanted = {re.sub(r"^week", "", a, flags=re.I).zfill(2) for a in argv}
        keys = [k for k in keys if re.match(r"week(\d+)", k.name).group(1).zfill(2) in wanted]
    failed, cache = False, {}
    for key in keys:
        for c in parse_claims(key):
            try:
                page = cache.setdefault(c.url, fetch(c.url))
            except Exception as e:  # network or HTTP error: report, don't crash the run
                print(f"{key.name} {c.qid}: FETCH FAILED {c.url} ({e})")
                failed = True
                continue
            ok = quote_present(c.quote, page)
            failed = failed or not ok
            print(f"{key.name} {c.qid}: {'ok     ' if ok else 'CHANGED'} {c.url}")
            if not ok:
                print(f"    quote no longer on page: \"{c.quote}\" — re-check the question's key")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
