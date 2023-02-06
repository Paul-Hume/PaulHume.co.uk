import { format as dateFormat, formatDuration as fnsFormatDuration,intervalToDuration } from 'date-fns';

export const formatDate = (date: string, format?: string): string => {
  // If no date, return an empty string
  if (!date) return '';
  // If the date is invalid, return the date
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }
  // Return the formatted date
  return dateFormat(parsedDate, format || 'do MMM yyyy');
};

export const formatDuration = (from: string, to: string): string => {
  if (!from || !to) return '';

  const fromParsed = new Date(from);
  const toParsed = new Date(to);

  const duration = intervalToDuration({
    start: fromParsed,
    end: toParsed,
  });

  return fnsFormatDuration(duration, { format: ['years', 'months', 'weeks'] });
};