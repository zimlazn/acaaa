import { TimeTogether } from '../types';

// Anniversary start date: 8 August 2024 at 23:38 (11:38 PM)
export const START_DATE = new Date(2024, 7, 8, 23, 38, 0);

export function calculateTimeTogether(now: Date = new Date()): TimeTogether {
  const diffMs = Math.max(0, now.getTime() - START_DATE.getTime());

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const seconds = totalSeconds % 60;
  const minutes = totalMinutes % 60;
  const hours = totalHours % 24;
  const days = totalDays;

  return {
    days,
    hours,
    minutes,
    seconds,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
  };
}

export function formatFormattedDate(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
