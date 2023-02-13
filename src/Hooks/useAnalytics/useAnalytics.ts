import ReactGA from 'react-ga4';

interface ButtonClickProps {
  button: string;
  value?: number;
}

export const useAnalytics = () => {
  const pageView = () => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
  };

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