import { ReactNode, FC, useState } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import tw, { styled } from 'twin.macro';
import { AnimatePresence, motion, Transition, Variants } from 'framer-motion';

type MenuProps = Omit<
  RadixDropdownMenu.DropdownMenuProps,
  'open' | 'onOpenChange'
> & {
  /**
   * *A single {@link JSX.Element}* as the button to control the popup menu to be rendered where {@link Menu} is used.
   *
   * **Note:** A valid trigger here must be an HTML native element or an element that implement the {@link React.forwardRef} API.
   */
  trigger: ReactNode;
  /**
   * Props passed into the popup menu element
   */
  menuPopupProps?: RadixDropdownMenu.DropdownMenuContentProps;
};

/**
 * A component renders a popup menu and a button to control that popup.
 *
 * @example
 * A menu consisting of a mix of Menuitem and MenuLink and a ButtonGhost to control the menu
 * ```jsx
 * <Menu buton={<ButtonGhost rounded>Click me!</ButtonGhost>}>
 *  <MenuItem onSelect={() => console.log('Item 1 selected')}>Item 1</MenuItem>
 *  <MenuItem onSelect={() => console.log('Item 2 selected')}>Item 2</MenuItem>
 *  <MenuLink href="/url-of-link-1">Link 1</MenuLink>
 * </Menu>
 * ```
 */
const Menu: FC<MenuProps> = ({
  trigger,
  menuPopupProps,
  children,
  ...props
}) => {
  const [showMenu, setShowMenu] = useState(props.defaultOpen);
  return (
    <RadixDropdownMenu.Root
      {...props}
      open={showMenu}
      onOpenChange={setShowMenu}
    >
      <RadixDropdownMenu.Trigger asChild>{trigger}</RadixDropdownMenu.Trigger>
      <AnimatePresence>
        {/* Required to aniamte exit */}
        {showMenu && (
          <MenuContent
            align="start"
            sideOffset={8}
            {...menuPopupProps}
            asChild
            forceMount
          >
            <motion.div
              transition={ANIMATION_TRANSITION}
              variants={ANIMATION_VARIANTS}
              initial={props.defaultOpen ? false : `hidden`}
              animate="visible"
              exit="hidden"
            >
              {children}
            </motion.div>
          </MenuContent>
        )}
      </AnimatePresence>
    </RadixDropdownMenu.Root>
  );
};

export default Menu;

/**
 * Animation for expanding and collapsing effect of the menu
 */
const ANIMATION_TRANSITION: Transition = {
  type: 'spring',
  duration: 0.5,
};
const ANIMATION_VARIANTS: Variants = {
  visible: {
    height: 'auto',
  },
  hidden: {
    height: 0,
  },
};

/**
 * A component provides styling for {@link RadixDropdownMenu.Content} (the menu popup)
 */
const MenuContent = styled(RadixDropdownMenu.Content)`
  ${tw`font-normal bg-white min-w-[12.5rem] shadow-z8 rounded overflow-hidden`}
  ${tw`origin-[var(--radix-dropdown-menu-content-transform-origin)]`}
`;
