"""
Diagnose Google Search Console indexation + performance for unpopularvoice.com.

Cross-references GSC data with the local article corpus to find:
- Articles with zero impressions (likely unindexed)
- Articles losing traffic
- Top-performing pages
- Top queries driving clicks

Usage:
  python3 scripts/gsc_diagnose.py [--days N]

Defaults to last 28 days.
"""
import argparse
import glob
import re
import sys
import warnings
from datetime import date, timedelta
from pathlib import Path

warnings.filterwarnings("ignore")
from google.oauth2 import service_account
from googleapiclient.discovery import build

KEY_PATH = Path(__file__).parent.parent / ".gsc" / "service-account.json"
SITE_URL = "sc-domain:unpopularvoice.com"
SITE_HOST = "https://unpopularvoice.com"


def gsc_client():
    if not KEY_PATH.exists():
        sys.exit(f"missing key: {KEY_PATH}")
    creds = service_account.Credentials.from_service_account_file(
        str(KEY_PATH),
        scopes=["https://www.googleapis.com/auth/webmasters.readonly"],
    )
    return build("searchconsole", "v1", credentials=creds, cache_discovery=False)


def local_article_slugs():
    root = Path(__file__).parent.parent
    files = sorted(
        glob.glob(str(root / "content/articles/*.mdx"))
        + glob.glob(str(root / "content/comparisons/*.mdx"))
    )
    slugs = set()
    for f in files:
        base = Path(f).stem
        text = Path(f).read_text()
        m = re.search(r"^published:\s*(true|false)", text, re.MULTILINE)
        if m and m.group(1) == "false":
            continue
        if "/comparisons/" in f:
            slugs.add(f"compare/{base}")
        else:
            slugs.add(base)
    return slugs


def query_gsc(svc, days, dimensions, row_limit=25000):
    end = date.today() - timedelta(days=2)  # GSC has ~2-day lag
    start = end - timedelta(days=days)
    body = {
        "startDate": start.isoformat(),
        "endDate": end.isoformat(),
        "dimensions": dimensions,
        "rowLimit": row_limit,
    }
    resp = svc.searchanalytics().query(siteUrl=SITE_URL, body=body).execute()
    return resp.get("rows", []), start, end


def slug_from_url(url):
    if not url.startswith(SITE_HOST):
        return None
    path = url[len(SITE_HOST):].strip("/")
    return path or "(home)"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--days", type=int, default=28)
    args = ap.parse_args()

    svc = gsc_client()
    local_slugs = local_article_slugs()

    # Overall summary
    totals, start, end = query_gsc(svc, args.days, dimensions=[])
    tot = totals[0] if totals else {"clicks": 0, "impressions": 0}
    print(f"\n=== SUMMARY  ({start} → {end}, {args.days} days) ===")
    print(f"  Total clicks:      {int(tot.get('clicks', 0)):,}")
    print(f"  Total impressions: {int(tot.get('impressions', 0)):,}")
    ctr = tot.get("ctr", 0) * 100
    pos = tot.get("position", 0)
    print(f"  Overall CTR:       {ctr:.2f}%")
    print(f"  Avg position:      {pos:.1f}")

    # Per-page performance
    pages, _, _ = query_gsc(svc, args.days, dimensions=["page"])
    print(f"\n=== TOP 15 PAGES BY IMPRESSIONS ===")
    print(f"{'clicks':>7}  {'impr':>7}  {'ctr':>6}  {'pos':>5}  slug")
    print("-" * 70)
    pages_sorted = sorted(pages, key=lambda r: -r["impressions"])
    for r in pages_sorted[:15]:
        url = r["keys"][0]
        slug = slug_from_url(url) or url
        print(
            f"{int(r['clicks']):>7}  {int(r['impressions']):>7}  "
            f"{r['ctr']*100:>5.1f}%  {r['position']:>5.1f}  {slug}"
        )

    # Coverage vs local corpus
    urls_with_data = {slug_from_url(r["keys"][0]) for r in pages if slug_from_url(r["keys"][0])}
    zero_impression_slugs = sorted(local_slugs - urls_with_data)
    print(f"\n=== INDEXATION SIGNAL: articles with ZERO impressions in {args.days}d ===")
    print(f"  Total published articles: {len(local_slugs)}")
    print(f"  Articles with any GSC data: {len(urls_with_data & local_slugs)}")
    print(f"  Articles with zero data:    {len(zero_impression_slugs)}")
    print()
    if zero_impression_slugs:
        print("  These are effectively invisible on Google:")
        for s in zero_impression_slugs[:30]:
            print(f"    - {SITE_HOST}/{s}")
        if len(zero_impression_slugs) > 30:
            print(f"    ... and {len(zero_impression_slugs) - 30} more")

    # Top queries
    queries, _, _ = query_gsc(svc, args.days, dimensions=["query"])
    queries_sorted = sorted(queries, key=lambda r: -r["clicks"])
    print(f"\n=== TOP 15 QUERIES BY CLICKS ===")
    print(f"{'clicks':>7}  {'impr':>7}  {'ctr':>6}  {'pos':>5}  query")
    print("-" * 70)
    for r in queries_sorted[:15]:
        q = r["keys"][0]
        print(
            f"{int(r['clicks']):>7}  {int(r['impressions']):>7}  "
            f"{r['ctr']*100:>5.1f}%  {r['position']:>5.1f}  {q}"
        )

    # High-impression, low-CTR queries (opportunity)
    opp = [q for q in queries if q["impressions"] >= 50 and q["ctr"] < 0.02]
    opp.sort(key=lambda r: -r["impressions"])
    if opp:
        print(f"\n=== CTR OPPORTUNITIES (≥50 impressions, <2% CTR) ===")
        print(f"{'impr':>7}  {'ctr':>6}  {'pos':>5}  query")
        print("-" * 70)
        for r in opp[:15]:
            print(
                f"{int(r['impressions']):>7}  {r['ctr']*100:>5.2f}%  "
                f"{r['position']:>5.1f}  {r['keys'][0]}"
            )


if __name__ == "__main__":
    main()
