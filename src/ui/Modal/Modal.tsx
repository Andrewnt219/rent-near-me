import { FC, ReactNode } from 'react';
import tw, { css, styled } from 'twin.macro';
import { IoCloseOutline } from 'react-icons/io5';
import { ButtonSimple } from '@ui/Button/Button';
import ModalPortal from './ModalPortal';

type CloseModalButtonPosition = 'left' | 'right' | 'none';
type ModalSize = 'full' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

const closeModalBtnCss = (closeBtnPos: CloseModalButtonPosition) => {
  let closeBtnPosCss;
  if (closeBtnPos === 'none') {
    closeBtnPosCss = tw`hidden`;
  } else {
    closeBtnPosCss = closeBtnPos === 'left' ? tw`left-4` : tw`right-4`;
  }
  return css`
    ${closeBtnPosCss}
    ${tw`p-1.5 absolute top-1/2 transform -translate-y-1/2 mt-0.5`}
  `;
};

const modalHeaderContentCss = tw`overflow-auto max-h-16`;
const modalBodyContentCss = css`
  max-height: calc(100vh - 10rem);
  ${tw`overflow-auto pr-2`}
`;

type ModalProps = {
  size?: ModalSize;
  show: boolean;
  onClose: () => void;
  header?: ReactNode;
  opaqueOverlay?: boolean;
  closeButtonPosition?: CloseModalButtonPosition;
};
const Modal: FC<ModalProps> = ({
  size = 'md',
  closeButtonPosition = 'left',
  header,
  children,
  ...props
}) => {
  return (
    <ModalPortal>
      <ModalOverlay
        {...props}
        onClick={(e) => e.target === e.currentTarget && props.onClose()}
      />
      <ModalDialog size={size} aria-hidden={!props.show} role="dialog">
        {header && (
          <ModalHeader>
            <ButtonSimple
              rounded
              css={closeModalBtnCss(closeButtonPosition)}
              onClick={() => props.onClose()}
            >
              <IoCloseOutline tw="w-6 h-6" />
              <span tw="sr-only">Close modal</span>
            </ButtonSimple>
            <div css={modalHeaderContentCss}>{header}</div>
          </ModalHeader>
        )}
        <ModalBody>
          <div css={modalBodyContentCss}>{children}</div>
        </ModalBody>
      </ModalDialog>
    </ModalPortal>
  );
};

const ModalOverlay = styled.div<ModalProps>`
  ${tw`fixed top-0 left-0 w-screen h-screen`}
  ${tw`grid place-content-center`}
  ${(props) => props.opaqueOverlay && tw`bg-opaque`}
  ${(props) => !props.show && tw`hidden`}
`;

type ModalDialogProps = {
  size?: ModalSize;
};
const ModalDialog = styled.div<ModalDialogProps>`
  ${(props) => {
    switch (props.size) {
      case 'full':
        return css`
          width: calc(100% - 1rem);
        `;
      case 'xl':
        return css`
          width: 80rem;
        `;
      case 'lg':
        return css`
          width: 60rem;
        `;
      case 'sm':
        return css`
          width: 20rem;
        `;
      case 'xs':
        return css`
          width: 10rem;
        `;
      default:
        return css`
          width: 40rem;
        `;
    }
  }}
  max-width: calc(100% - 1rem);
  ${tw`bg-white rounded-xl shadow-xl`}
  ${tw`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
  ${tw`transition-transform ease-out duration-500`}
  &[aria-hidden='true'] {
    ${tw`translate-y-[100vh]`}
    ${tw`transition-none`}
  }
`;

const ModalHeader = styled.div`
  ${tw`relative px-6 py-4`}
  ${tw`border-b border-gray-light`}
  ${tw`text-center font-bold`}
`;

const ModalBody = styled.div`
  ${tw`p-6`}
`;

export default Modal;
