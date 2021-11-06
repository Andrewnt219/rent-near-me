import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ComponentProps } from 'react';
import Snackbar from './Snackbar';

type TSnackbar = ComponentProps<typeof Snackbar> & {
  id: string;
};
type Props = {
  className?: string;
  snacks: TSnackbar[];
};
function SnackbarList({ className, ...props }: Props) {
  return (
    <ol className={className} tw="flex flex-col gap-sm">
      <AnimatePresence>
        {props.snacks.map((snackbarProps) => (
          <motion.li
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
  },
};

export default SnackbarList;
