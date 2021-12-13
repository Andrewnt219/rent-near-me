import { FC, ReactNode, useState, VFC } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import tw, { styled } from 'twin.macro';
import { AnimatePresence, motion, Variants } from 'framer-motion';

type TooltipProps = Omit<RadixTooltip.TooltipProps, 'open' | 'onOpenChange'> & {
  /**
   * *A single {@link JSX.Element}* as the handle to control the tooltip popover to be rendered where {@link Tooltip} is used.
   *
   * **Note:** A valid trigger here must be an HTML native element or an element that implement the {@link React.forwardRef} API.
   */
  trigger: ReactNode;
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
          <TooltipContent
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
            >
              {children}
              <TooltipArrow />
            </motion.div>
          </TooltipContent>
        )}
      </AnimatePresence>
    </RadixTooltip.Root>
  );
};

export default Tooltip;

/**
 * Animation for the showing and hidding effect of the tooltip
 */
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

/**
 * A component provides styling for {@link RadixTooltip.Content}
 */
const TooltipContent = styled(RadixTooltip.Content)`
  ${tw`px-sm py-xs rounded-md`}
  ${tw`origin-[var(--radix-tooltip-content-transform-origin)]`}
  ${tw`bg-gray-800 text-white`}
`;

/**
 * A component provides styling for {@link RadixTooltip.Arrow}
 */
const TooltipArrow: VFC = () => (
  <RadixTooltip.Arrow tw="fill-current text-gray-800" width={12} height={6} />
);
