import { FC, ReactNode } from 'react';
import tw, { css, styled } from 'twin.macro';
import { IoCloseOutline } from 'react-icons/io5';
import { Dialog } from '@reach/dialog';
import { ButtonSimple } from '@ui/Button/Button';

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
  return (
    <Dialog
      css={modalDialogCss(show, size)}
      isOpen={show}
      onDismiss={() => onClose()}
      {...props}
    >
      {header && (
        <ModalHeader>
          <ButtonSimple
            rounded
            css={closeModalBtnCss(closeButtonPosition)}
            onClick={() => onClose()}
          >
            <IoCloseOutline tw="w-6 h-6" />
            <span tw="sr-only">Close dialog</span>
          </ButtonSimple>
          <ModalHeaderContent>{header}</ModalHeaderContent>
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
      closeBtnPosCss = tw`right-4`;
      break;
    default:
      closeBtnPosCss = tw`left-4`;
  }
  return css`
    ${closeBtnPosCss}
    ${tw`p-1.5 absolute top-1/2 transform -translate-y-1/2 mt-0.5`}
  `;
};

const modalDialogCss = (show: boolean, size: ModalSize) => {
  let sizeCss;
  switch (size) {
    case 'full':
      sizeCss = css`
        width: calc(100% - 1rem);
      `;
      break;
    case 'xl':
      sizeCss = css`
        width: 80rem;
      `;
      break;
    case 'lg':
      sizeCss = css`
        width: 60rem;
      `;
      break;
    case 'sm':
      sizeCss = css`
        width: 20rem;
      `;
      break;
    case 'xs':
      sizeCss = css`
        width: 10rem;
      `;
      break;
    default:
      sizeCss = css`
        width: 40rem;
      `;
  }

  return css`
    ${sizeCss}
    max-width: calc(100% - 1rem);
    ${tw`bg-white rounded-xl shadow-xl`}
    ${tw`p-0 m-0`}
    ${tw`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
  `;
};

const ModalHeader = styled.div`
  ${tw`relative px-6 py-4`}
  ${tw`border-b border-gray-light`}
  ${tw`text-center font-bold`}
`;
const ModalHeaderContent = styled.div`
  ${tw`overflow-auto max-h-16`}
`;

const ModalBody = styled.div`
  ${tw`p-6`}
`;
const ModalBodyContent = styled.div`
  max-height: calc(100vh - 10rem);
  ${tw`overflow-auto p-1`}
`;

export default Modal;
