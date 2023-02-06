import { Alert, AlertTitle } from '@mui/material';

interface ErrorAlertProps {
  title?: string;
  error: string;
  className?: string;
}

export const ErrorAlert = ({ title, error, className = '' }: ErrorAlertProps) => {
  return (
    <Alert severity="error" className={className}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {error}
    </Alert>
  );
};