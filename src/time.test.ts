import { describe, expect, it } from 'vitest';
import { getCountdown, getProgress, getDailyQuoteIndex, pickAnotherQuote } from './time';

describe('countdown', () => {
  it('splits the remaining time into days, hours, minutes and seconds', () => {
    expect(getCountdown(new Date('2030-01-02T01:02:03Z').getTime(), new Date('2030-01-01T00:00:00Z').getTime()))
      .toEqual({ days: 1, hours: 1, minutes: 2, seconds: 3, complete: false });
  });
  it('celebrates at the deadline and clamps past dates to zero', () => {
    for (const now of [1000, 2000]) expect(getCountdown(1000, now)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0, complete: true });
  });
});
describe('progress', () => {
  it('clamps the timeline before, during and after the thesis', () => {
    expect([0, 150, 300].map(now => getProgress(100, 200, now))).toEqual([0, 50, 100]);
  });
});
describe('quotes', () => {
  it('selects the same quote for a local calendar day, including leap day', () => {
    expect(getDailyQuoteIndex(new Date(2024, 0, 1), 20)).toBe(0);
    expect(getDailyQuoteIndex(new Date(2024, 1, 29, 1), 20)).toBe(19);
    expect(getDailyQuoteIndex(new Date(2024, 1, 29, 23), 20)).toBe(19);
    expect(getDailyQuoteIndex(new Date(2024, 2, 1), 20)).toBe(0);
  });
  it('another quote never repeats the current one', () => {
    expect(pickAnotherQuote(2, 5, () => 0.5)).not.toBe(2);
    expect(pickAnotherQuote(0, 1)).toBe(0);
  });
});
