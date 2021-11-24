import tw from 'twin.macro';
import { useTabAnimation } from '../contexts/TabAnimationContext';
import {
  TabOptionContextValue,
  useTabOption,
} from '../contexts/TabOptionContext';

const SelectedTabIndicator = () => {
  const { selectedButtonRect, tabHeaderRect } = useTabAnimation();
  const { theme } = useTabOption();
  return (
    <span
      css={`
        ${tw`absolute -bottom-px h-0.5`}
        ${tw`transition-all duration-500`}
        ${getSelectedTabIndicatorThemeStyle(theme)}
      `}
      style={{
        left: (selectedButtonRect?.left ?? 0) - (tabHeaderRect?.left ?? 0),
        width: selectedButtonRect?.width,
      }}
    />
  );
};
const getSelectedTabIndicatorThemeStyle = (
  theme?: TabOptionContextValue['theme']
) => {
  if (theme === 'secondary') {
    return tw`bg-secondary`;
  }
  return tw`bg-primary`;
};

export default SelectedTabIndicator;
