import { format as dateFormat } from 'date-fns';

export const formatDate = (date: string, format?: string) => {
  return dateFormat(new Date(date), format || 'do MMM yyyy'); 
};