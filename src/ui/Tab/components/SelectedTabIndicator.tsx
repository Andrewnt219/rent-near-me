import tw from 'twin.macro';
import { useTabAnimation } from '../contexts/TabAnimationContext';
import {
  TabOptionContextValue,
  useTabOption,
} from '../contexts/TabOptionContext';

const SelectedTabIndicator = () => {
  const { selectedButtonRect, tabGroupRect } = useTabAnimation();
  const { theme } = useTabOption();
  return (
    <span
      css={`
        ${tw`absolute h-0.5`}
        ${tw`transition-all duration-500`}
        ${getSelectedTabIndicatorThemeStyle(theme)}
      `}
      style={{
        left: (selectedButtonRect?.left ?? 0) - (tabGroupRect?.left ?? 0),
        top: (selectedButtonRect?.bottom ?? 0) - (tabGroupRect?.top ?? 0) - 1,
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
