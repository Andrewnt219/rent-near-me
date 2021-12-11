import { FC, ReactNode } from 'react';
import tw, { css, styled } from 'twin.macro';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { useId } from '@radix-ui/react-id';
import {
  DialogOverlay as ReachDialogOverlay,
  DialogContent as ReachDialogContent,
} from '@reach/dialog';
import { ButtonGhost } from '@ui/Button';
import Text from '@ui/Text/Text';
import { AnimatePresence, motion, Variants } from 'framer-motion';

type CloseModalButtonPosition = 'left' | 'right' | 'none';
type ModalSize = 'full' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

type ModalProps = {
  show: boolean;
  onClose: () => void;
  id?: string;
  size?: ModalSize;
  header?: ReactNode;
  closeButtonPosition?: CloseModalButtonPosition;
  closeButtonIcon?: ReactNode;
};
const Modal: FC<ModalProps> = ({
  show,
  onClose,
  id,
  size = 'md',
  closeButtonPosition = 'left',
  closeButtonIcon,
  header,
  children,
  ...props
}) => {
  const modalId = useId(id);
  const modalTitleId = `modal-title-${modalId}`;
  return (
    <AnimatePresence>
      {show && (
        <AnimatedReachDialogOverlay
          onDismiss={onClose}
          transition={{ duration: animationDuration }}
          variants={overlayAnimationVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <AnimatedReachDialogContent
            id={modalId}
            aria-labelledby={modalTitleId}
            css={modalDialogCss(size)}
            {...props}
            transition={{ duration: animationDuration }}
            variants={contentAnimationVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {header && (
              <ModalHeader>
                <ButtonGhost
                  icon
                  css={closeModalBtnCss(closeButtonPosition)}
                  onClick={onClose}
                >
                  {closeButtonIcon ?? <Icon icon={closeFill} tw="w-6 h-6" />}
                  <span tw="sr-only">Close dialog</span>
                </ButtonGhost>
                <Text component="h3" variant="h5" id={modalTitleId}>
                  {header}
                </Text>
              </ModalHeader>
            )}
            <ModalBody>
              <ModalBodyContent>{children}</ModalBodyContent>
            </ModalBody>
          </AnimatedReachDialogContent>
        </AnimatedReachDialogOverlay>
      )}
    </AnimatePresence>
  );
};

const animationDuration = 0.4;
const overlayAnimationVariants: Variants = {
  visible: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  hidden: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
};
const contentAnimationVariants: Variants = {
  visible: {
    x: '-50%',
    y: '-50%',
  },
  hidden: {
    x: '-50%',
    y: '100vh',
  },
};

const closeModalBtnCss = (closeBtnPos: CloseModalButtonPosition) => {
  let closeBtnPosCss;
  switch (closeBtnPos) {
    case 'none':
      closeBtnPosCss = tw`hidden`;
      break;
    case 'right':
      closeBtnPosCss = tw`right-md`;
      break;
    default:
      closeBtnPosCss = tw`left-md`;
  }
  return css`
    ${closeBtnPosCss}
    ${tw`absolute top-1/2 transform -translate-y-1/2`}
  `;
};

const modalDialogCss = (size: ModalSize) => {
  let sizeCss;
  switch (size) {
    case 'full':
      sizeCss = css`
        width: calc(100% - 1rem);
      `;
      break;
    case 'xl':
      sizeCss = tw`w-[80rem]`;
      break;
    case 'lg':
      sizeCss = tw`w-[60rem]`;
      break;
    case 'sm':
      sizeCss = tw`w-80`;
      break;
    case 'xs':
      sizeCss = tw`w-40`;
      break;
    default:
      sizeCss = tw`w-[40rem]`;
  }

  return css`
    max-width: calc(100% - 1rem);
    max-height: calc(100% - 1rem);
    ${sizeCss}
    ${tw` bg-white rounded overflow-auto isolate`}
    ${tw`p-0 m-0`}
    ${tw`fixed top-1/2 left-1/2`}
  `;
};

const AnimatedReachDialogOverlay = motion(ReachDialogOverlay);

const AnimatedReachDialogContent = motion(ReachDialogContent);

const ModalHeader = styled.div`
  ${tw`sticky top-0 z-10 bg-white text-center py-md`}
  ${tw`border-b border-light`}
`;

const ModalBody = styled.div`
  ${tw`p-lg`}
`;

const ModalBodyContent = styled.div`
  ${tw`overflow-auto p-xs`}
`;

export default Modal;
