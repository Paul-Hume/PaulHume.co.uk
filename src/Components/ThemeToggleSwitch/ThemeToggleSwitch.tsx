import { StyledSwitch } from './StyledSwitch';
import { useUi } from 'Context/uiContext';


export const ThemeToggleSwitch = () => {
  const { theme, toggleTheme, currentTheme } = useUi();

  return (
    <StyledSwitch checked={theme === 'dark'} onChange={toggleTheme} theme={currentTheme} />
  );
};