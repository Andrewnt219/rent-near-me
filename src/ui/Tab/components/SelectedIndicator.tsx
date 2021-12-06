import { motion } from 'framer-motion';
import { ComponentProps, VFC } from 'react';
import tw from 'twin.macro';
import {
  TabOptionContextValue,
  useTabOption,
} from '../contexts/TabOptionContext';

type SelectedIndicatorProps = ComponentProps<typeof motion.span>;

/**
 * A color ribbon underneath the currently selected TabButton
 */
const SelectedIndicator: VFC<SelectedIndicatorProps> = (props) => {
  const { theme } = useTabOption();
  return (
    <motion.span
      aria-hidden
      css={`
        ${tw`absolute bottom-0 left-0 h-0.5 w-full`}
        ${getSelectedIndicatorThemeStyle(theme)}
      `}
      {...props}
    />
  );
};

/**
 * Getter for color styling of {@link SelectedIndicator} by theme
 */
const getSelectedIndicatorThemeStyle = (
  theme?: TabOptionContextValue['theme']
) => {
  if (theme === 'secondary') {
    return tw`bg-secondary`;
  }
  return tw`bg-primary`;
};

export default SelectedIndicator;
