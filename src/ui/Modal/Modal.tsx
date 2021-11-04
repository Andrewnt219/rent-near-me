import { useUuid } from '@hooks/useUuid';
import { Dialog } from '@reach/dialog';
import { IconButtonGhost } from '@ui/IconButton/IconButton';
import Text from '@ui/Text/Text';
import { FC, ReactNode } from 'react';
import { Icon } from '@iconify/react';
import tw, { css, styled } from 'twin.macro';

type CloseModalButtonPosition = 'left' | 'right' | 'none';
type ModalSize = 'full' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

type ModalProps = {
  show: boolean;
  onClose: () => void;
  size?: ModalSize;
  header?: ReactNode;
  closeButtonPosition?: CloseModalButtonPosition;
};
const Modal: FC<ModalProps> = ({
  show,
  onClose,
  size = 'md',
  closeButtonPosition = 'left',
  header,
  children,
  ...props
}) => {
  const id = useUuid();

  return (
    <Dialog
      aria-labelledby={`${id}-modal-title`}
      css={modalDialogCss(size)}
      isOpen={show}
      onDismiss={onClose}
      {...props}
    >
      {header && (
        <ModalHeader>
          <IconButtonGhost
            css={closeModalBtnCss(closeButtonPosition)}
            onClick={onClose}
          >
            <Icon icon="mdi:close" tw="w-6 h-6" />
            <span tw="sr-only">Close dialog</span>
          </IconButtonGhost>
          <Text component="h3" variant="h5" id={`${id}-modal-title`}>
            {header}
          </Text>
        </ModalHeader>
      )}
      <ModalBody>
        <ModalBodyContent>{children}</ModalBodyContent>
      </ModalBody>
    </Dialog>
  );
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
    ${tw` absolute top-1/2 transform -translate-y-1/2`}
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
    ${sizeCss}
    ${tw`bg-white rounded`}
    ${tw`p-0 m-0`}
    ${tw`fixed lg:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
  `;
};

const ModalHeader = styled.div`
  ${tw`relative text-center py-md`}
  ${tw`border-b border-light`}
`;

const ModalBody = styled.div`
  ${tw`px-lg pb-xl pt-lg`}
`;
const ModalBodyContent = styled.div`
  ${tw`overflow-auto p-xs`}
`;

export default Modal;
