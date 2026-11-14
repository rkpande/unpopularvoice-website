"""
Use GSC URL Inspection API to check the actual index status of representative URLs.

Tells us whether Google has crawled + indexed each page, and if not, why.
"""
import sys
import time
import warnings
from pathlib import Path

warnings.filterwarnings("ignore")
from google.oauth2 import service_account
from googleapiclient.discovery import build

KEY_PATH = Path(__file__).parent.parent / ".gsc" / "service-account.json"
SITE_URL = "sc-domain:unpopularvoice.com"

SAMPLE_URLS = [
    "https://unpopularvoice.com/",
    "https://unpopularvoice.com/goodglamm-cirp",
    "https://unpopularvoice.com/acko-fy2025",
    "https://unpopularvoice.com/meesho-fy2025",
    "https://unpopularvoice.com/zerodha-fy2025",
    "https://unpopularvoice.com/articles",
    "https://unpopularvoice.com/sitemap.xml",
    "https://unpopularvoice.com/methodology",
    "https://unpopularvoice.com/compare/rapido-vs-uber-vs-ola",
]


def main():
    creds = service_account.Credentials.from_service_account_file(
        str(KEY_PATH),
        scopes=["https://www.googleapis.com/auth/webmasters.readonly"],
    )
    svc = build("searchconsole", "v1", credentials=creds, cache_discovery=False)

    print(f"{'URL':<55}  {'Verdict':<10}  {'Coverage':<28}  Last crawl")
    print("-" * 130)
    for url in SAMPLE_URLS:
        try:
            resp = svc.urlInspection().index().inspect(body={
                "inspectionUrl": url,
                "siteUrl": SITE_URL,
            }).execute()
            r = resp.get("inspectionResult", {})
            idx = r.get("indexStatusResult", {})
            verdict = idx.get("verdict", "?")
            coverage = idx.get("coverageState", "?")[:27]
            last_crawl = idx.get("lastCrawlTime", "-")[:10]
            robots = idx.get("robotsTxtState", "?")
            indexing_state = idx.get("indexingState", "?")
            page_fetch = idx.get("pageFetchState", "?")
            google_can_url = idx.get("googleCanonical", "-")
            user_can_url = idx.get("userCanonical", "-")

            print(f"{url[:54]:<55}  {verdict:<10}  {coverage:<28}  {last_crawl}")
            print(f"    robots={robots}  indexingState={indexing_state}  pageFetch={page_fetch}")
            if google_can_url != url:
                print(f"    userCanonical:   {user_can_url}")
                print(f"    googleCanonical: {google_can_url}")
            print()
            time.sleep(0.5)  # be nice to the API
        except Exception as e:
            print(f"{url[:54]:<55}  ERROR: {e}")


if __name__ == "__main__":
    main()
