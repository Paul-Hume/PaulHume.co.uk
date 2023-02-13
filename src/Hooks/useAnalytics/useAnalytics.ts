import { useCallback } from 'react';
import ReactGA from 'react-ga4';

interface ButtonClickProps {
  button: string;
  value?: number;
}

export const useAnalytics = () => {
  const pageView = useCallback((page: string) => {
    ReactGA.send({ hitType: 'pageview', page });
  }, []);

  const buttonClick = ({ button, value }: ButtonClickProps) => {
    ReactGA.event({
      category: 'button',
      action: 'click',
      label: button,
      value: value || 1,
    });
  };

  return {
    pageView,
    buttonClick,
  };
};