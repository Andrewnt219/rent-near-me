import { FC, ReactNode, useState } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import tw, { css } from 'twin.macro';
import { AnimatePresence, motion, Variants } from 'framer-motion';

type TooltipProps = Omit<RadixTooltip.TooltipProps, 'open' | 'onOpenChange'> & {
  /**
   * *A single {@link JSX.Element}* as the handle to control the tooltip popover to be rendered where {@link Tooltip} is used.
   *
   * **Note:** A valid trigger here must be an HTML native element or an element that implement the {@link React.forwardRef} API.
   */
  trigger: ReactNode;
  /**
   * Theme color to be applied on the tooltip popover
   */
  theme?: 'dark' | 'light' | 'primary' | 'secondary';
  /**
   * Props passed into the tooltip popover element
   */
  menuPopupProps?: RadixTooltip.TooltipContentProps;
};

/**
 * A component renders a popover and a handle that shows the popover on hover and hide it on leave.
 *
 * @example
 * <Tooltip trigger={<Icon icon={circleQuestionMarkFiLL} />}>
 *  This text shows up in a popover when the user hovers on the trigger
 * </Tooltip>
 */
const Tooltip: FC<TooltipProps> = ({
  trigger,
  theme,
  menuPopupProps,
  children,
  ...props
}) => {
  const [showTooltip, setShowTooltip] = useState(props.defaultOpen);
  return (
    <RadixTooltip.Root
      delayDuration={0}
      {...props}
      open={showTooltip}
      onOpenChange={setShowTooltip}
    >
      <RadixTooltip.Trigger asChild>{trigger}</RadixTooltip.Trigger>
      <AnimatePresence>
        {/* Required to aniamte exit */}
        {showTooltip && (
          <RadixTooltip.Content
            side="top"
            sideOffset={4}
            {...menuPopupProps}
            asChild
            forceMount
          >
            <motion.div
              variants={animationVariants}
              initial={props.defaultOpen ? false : 'hidden'}
              animate="visible"
              exit="hidden"
              css={`
                ${tw`px-sm py-xs rounded-md`}
                ${tw`origin-[var(--radix-tooltip-content-transform-origin)]`}
                ${getTooltipThemeStyle(theme)}
              `}
            >
              {children}
              <RadixTooltip.Arrow
                width={12}
                height={6}
                css={getTooltipArrowThemeStyle(theme)}
              />
            </motion.div>
          </RadixTooltip.Content>
        )}
      </AnimatePresence>
    </RadixTooltip.Root>
  );
};

export default Tooltip;

const animationVariants: Variants = {
  visible: {
    opacity: 1,
    scale: 1,
  },
  hidden: {
    opacity: 0,
    scale: 0,
  },
};

const getTooltipThemeStyle = (theme: TooltipProps['theme']) => {
  switch (theme) {
    case 'light':
      return tw`bg-white shadow-z8`;
    case 'primary':
      return tw`bg-primary text-white shadow-z1`;
    case 'secondary':
      return tw`bg-secondary text-white shadow-z1`;
    default:
      return tw`bg-gray-800 text-white`;
  }
};

const getTooltipArrowThemeStyle = (theme: TooltipProps['theme']) => {
  return css`
    ${tw`fill-current`}
    ${() => {
      switch (theme) {
        case 'light':
          return tw`text-white`;
        case 'primary':
          return tw`text-primary`;
        case 'secondary':
          return tw`text-secondary`;
        default:
          return tw`text-gray-800`;
      }
    }}
  `;
};
