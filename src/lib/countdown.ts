/**
 * Countdown maths shared by the build (first paint) and the browser (live ticking).
 * Days on the chip are counted in calendar days in the venue's time zone, like the app.
 */
export interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** Whole calendar days from today to the concert day, in the venue's zone. Negative once it has passed. */
  calendarDays: number;
  done: boolean;
}

const DAY = 86_400_000;

function dayNumber(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(date);
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  return Date.UTC(get('year'), get('month') - 1, get('day')) / DAY;
}

export function remaining(target: Date, timeZone: string, now = new Date()): Remaining {
  const ms = Math.max(0, target.getTime() - now.getTime());
  const total = Math.floor(ms / 1000);
  return {
    days: Math.floor(total / 86_400),
    hours: Math.floor((total % 86_400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    calendarDays: dayNumber(target, timeZone) - dayNumber(now, timeZone),
    done: ms === 0,
  };
}

export interface ChipLabels {
  days: string;
  day: string;
  today: string;
  past: string;
}

export function chipLabel(calendarDays: number, labels: ChipLabels): string {
  if (calendarDays < 0) return labels.past;
  if (calendarDays === 0) return labels.today;
  if (calendarDays === 1) return labels.day;
  return labels.days.replace('{n}', String(calendarDays));
}

export const pad = (value: number) => String(value).padStart(2, '0');
