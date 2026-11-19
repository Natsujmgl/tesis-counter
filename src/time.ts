export function getCountdown(target: number, now: number) {
  const total = Math.max(0, Math.floor((target - now) / 1000));
  return { days: Math.floor(total / 86400), hours: Math.floor(total / 3600) % 24,
    minutes: Math.floor(total / 60) % 60, seconds: total % 60, complete: now >= target };
}

export function getProgress(start: number, end: number, now: number) {
  return Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
}

export function getDailyQuoteIndex(date: Date, count: number) {
  // UTC calendar arithmetic avoids daylight-saving shifts in the local day of year.
  const day = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 1)) / 86400000);
  return day % count;
}

export function pickAnotherQuote(current: number, count: number, random = Math.random) {
  if (count < 2) return 0;
  const next = Math.floor(random() * (count - 1));
  return next >= current ? next + 1 : next;
}
