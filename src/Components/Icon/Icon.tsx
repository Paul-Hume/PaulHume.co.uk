import Description from '@mui/icons-material/Description';
import DeveloperMode from '@mui/icons-material/DeveloperMode';
import FilterAlt from '@mui/icons-material/FilterAlt';
import Home from '@mui/icons-material/Home';
import SettingsEthernet from '@mui/icons-material/SettingsEthernet';

export type IconType = 'home' | 'developerMode' | 'description' | 'settingsEthernet' | 'filterAlt';

const iconMap: { [key in IconType]: React.ReactNode } = {
  home: <Home />,
  developerMode: <DeveloperMode />,
  description: <Description />,
  settingsEthernet: <SettingsEthernet />,
  filterAlt: <FilterAlt />,
};


interface IconProps {
  name: IconType;
}

export const Icon = ({ name }: IconProps) => {
  return (
    <>{iconMap[name]}</>
  );
};
