// Strips time for user-facing display: "27 April 2026 14:30" → "27 April 2026"
export function formatDisplayDate(s: string): string {
  if (!s) return s
  const withTime = s.match(/^(\d{1,2}\s+\w+\s+\d{4})\s+\d{1,2}:\d{2}/)
  return withTime ? withTime[1] : s
}
