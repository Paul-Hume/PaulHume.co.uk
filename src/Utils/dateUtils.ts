import { format as dateFormat } from 'date-fns';

export const formatDate = (date: string, format?: string) => {
  if (!date) return '';
  return dateFormat(new Date(date), format || 'do MMM yyyy'); 
};