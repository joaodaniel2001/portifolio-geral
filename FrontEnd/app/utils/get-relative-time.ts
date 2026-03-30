export function getRelativeTimeString(
  date: Date | number,
  lang = "en-US",
): string {
  const timeMs = typeof date === "number" ? date : date.getTime();

  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  const cutoffs = [
    60,
    3600,
    86400,
    86400 * 7,
    86400 * 30,
    86400 * 365,
    Infinity,
  ];

  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ];

  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds),
  );

  const divisor = unitIndex > 0 ? cutoffs[unitIndex - 1] : 1;

  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });

  const value = Math.trunc(deltaSeconds / divisor);

  if (!isFinite(value) || !units[unitIndex]) {
    return "just now";
  }

  return rtf.format(value, units[unitIndex]);
}
