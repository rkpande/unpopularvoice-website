"""
Bulk URL Inspection across the entire published corpus.

For each URL, records:
- verdict (PASS / NEUTRAL / FAIL)
- coverageState (Submitted and indexed / Crawled - currently not indexed / etc)
- lastCrawlTime
- robotsTxtState / indexingState / pageFetchState
- googleCanonical vs userCanonical (mismatch = hidden bug)
- crawledAs (mobile / desktop)

Saves output as timestamped JSON so we can diff snapshots.

Also produces a ranked "Request Indexing" priority list — highest-potential URLs
first, so the daily 10-per-day manual GSC clicks maximise recovery.
"""
import argparse
import glob
import json
import re
import time
import warnings
from datetime import date
from pathlib import Path

warnings.filterwarnings("ignore")
from google.oauth2 import service_account
from googleapiclient.discovery import build

KEY_PATH = Path(__file__).parent.parent / ".gsc" / "service-account.json"
SITE_URL = "sc-domain:unpopularvoice.com"
SITE_HOST = "https://unpopularvoice.com"
SNAPSHOT_DIR = Path(__file__).parent.parent / ".gsc" / "snapshots"


def gsc_client():
    creds = service_account.Credentials.from_service_account_file(
        str(KEY_PATH),
        scopes=["https://www.googleapis.com/auth/webmasters"],
    )
    return build("searchconsole", "v1", credentials=creds, cache_discovery=False)


def all_published_urls():
    root = Path(__file__).parent.parent
    urls = [SITE_HOST + "/"]
    for path in [
        "/articles", "/compare", "/methodology",
        "/reality-check", "/employer-check", "/startup-jobs",
        "/subscribe", "/profitability-index",
    ]:
        urls.append(SITE_HOST + path)
    for f in sorted(glob.glob(str(root / "content/articles/*.mdx"))):
        text = Path(f).read_text()
        pub = re.search(r"^published:\s*(true|false)", text, re.MULTILINE)
        if pub and pub.group(1) == "false":
            continue
        urls.append(f"{SITE_HOST}/{Path(f).stem}")
    for f in sorted(glob.glob(str(root / "content/comparisons/*.mdx"))):
        urls.append(f"{SITE_HOST}/compare/{Path(f).stem}")
    return urls


def inspect(svc, url):
    resp = svc.urlInspection().index().inspect(body={
        "inspectionUrl": url, "siteUrl": SITE_URL
    }).execute()
    r = resp.get("inspectionResult", {}).get("indexStatusResult", {})
    return {
        "url": url,
        "verdict": r.get("verdict", "?"),
        "coverage": r.get("coverageState", "?"),
        "lastCrawl": r.get("lastCrawlTime", "-")[:10],
        "robots": r.get("robotsTxtState", "?"),
        "indexing": r.get("indexingState", "?"),
        "pageFetch": r.get("pageFetchState", "?"),
        "googleCanonical": r.get("googleCanonical", "-"),
        "userCanonical": r.get("userCanonical", "-"),
        "crawledAs": r.get("crawledAs", "-"),
    }


PRIORITY_ORDER = {
    "URL is on Google": 0,
    "Submitted and indexed": 0,
    "Indexed, not submitted in sitemap": 5,
    "Discovered - currently not indexed": 10,
    "Crawled - currently not indexed": 20,
    "Alternate page with proper canonical tag": 30,
    "Duplicate without user-selected canonical": 40,
    "Duplicate, Google chose different canonical than user": 50,
    "URL is unknown to Google": 60,
    "Blocked by robots.txt": 100,
    "Excluded by 'noindex' tag": 100,
    "Soft 404": 100,
}


def priority_score(row):
    coverage = row["coverage"]
    for k, v in PRIORITY_ORDER.items():
        if k.lower() in coverage.lower():
            return v
    return 30  # default: worth requesting indexing


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=None,
                    help="only inspect first N URLs (debug)")
    ap.add_argument("--delay", type=float, default=0.4,
                    help="seconds between API calls")
    args = ap.parse_args()

    SNAPSHOT_DIR.mkdir(parents=True, exist_ok=True)
    svc = gsc_client()
    urls = all_published_urls()
    if args.limit:
        urls = urls[: args.limit]

    print(f"Inspecting {len(urls)} URLs...")
    rows = []
    for i, url in enumerate(urls, 1):
        try:
            row = inspect(svc, url)
            rows.append(row)
            if i % 10 == 0:
                print(f"  {i}/{len(urls)}...")
            time.sleep(args.delay)
        except Exception as e:
            print(f"  ERROR on {url}: {e}")
            rows.append({"url": url, "error": str(e)})

    # Save snapshot
    today = date.today().isoformat()
    snap_path = SNAPSHOT_DIR / f"{today}.json"
    snap_path.write_text(json.dumps(rows, indent=2))
    print(f"\nSnapshot saved: {snap_path}")

    # Analysis
    print()
    print("=== Coverage distribution ===")
    from collections import Counter
    coverage_counts = Counter(r.get("coverage", "?") for r in rows if "url" in r)
    for cov, count in coverage_counts.most_common():
        print(f"  {count:>4}  {cov}")

    # Canonical mismatch
    print()
    print("=== Canonical mismatches (Google chose different) ===")
    mismatches = [
        r for r in rows
        if r.get("googleCanonical") not in ("-", "", r.get("url"), None)
        and r.get("googleCanonical") != r.get("userCanonical")
    ]
    if mismatches:
        for r in mismatches[:20]:
            print(f"  {r['url']}")
            print(f"    user:   {r['userCanonical']}")
            print(f"    google: {r['googleCanonical']}")
    else:
        print("  none — canonicals match everywhere")

    # Ranked list: not-yet-indexed URLs, sorted by priority for Request Indexing
    print()
    print("=== Top 10 URLs to Request Indexing (paste one at a time in GSC UI) ===")
    not_indexed = [r for r in rows if r.get("verdict") not in ("PASS", None)]
    not_indexed.sort(key=lambda r: (priority_score(r), r.get("lastCrawl", "")))
    for r in not_indexed[:10]:
        print(f"  [{r.get('coverage','?')[:35]:<35}] {r['url']}")


if __name__ == "__main__":
    main()
