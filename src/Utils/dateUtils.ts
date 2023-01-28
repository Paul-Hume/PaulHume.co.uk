import { format as dateFormat } from 'date-fns';

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