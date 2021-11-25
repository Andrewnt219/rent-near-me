import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  Variants,
} from 'framer-motion';
import { ComponentProps } from 'react';
import Snackbar from './Snackbar';

type TSnackbar = ComponentProps<typeof Snackbar> & {
  id: string;
};
type Props = {
  /**
   * Classname for merging styles
   */
  className?: string;
  /**
   * Snackbars information to render
   */
  snacks: TSnackbar[];
};
/**
 * Uses for grouping \<Snackbar />
 */
function SnackbarGroup({ className, ...props }: Props) {
  return (
    <ol className={className} tw="flex flex-col gap-sm w-[min(100%, 20rem)]">
      <AnimateSharedLayout>
        <AnimatePresence>
          {props.snacks.map((snackbarProps) => (
            <motion.li
              layout
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              key={snackbarProps.id}
            >
              <Snackbar {...snackbarProps} />
            </motion.li>
          ))}
        </AnimatePresence>
      </AnimateSharedLayout>
    </ol>
  );
}

// NOTE if using pixel, don't put as string
// ... else exit animation won't work
const itemVariants: Variants = {
  visible: {
    x: 0,
    opacity: 1,
  },
  hidden: {
    x: 50,
    opacity: 0,
  },
  exit: {
    opacity: 0,
    x: '100%',
  },
};

export default SnackbarGroup;
