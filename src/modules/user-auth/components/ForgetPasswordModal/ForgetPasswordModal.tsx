import { VFC } from 'react';
import { useModals } from '@ui/Modal/ModalContext';
import Modal from '@ui/Modal/Modal';
import ForgetPasswordForm from '../ForgetPasswordForm/ForgetPasswordForm';
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';

const ForgetPasswordModal: VFC = () => {
  const { isAuthReady, isAuthenticated } = useAuth();
  const { forgetPasswordModal, loginModal } = useModals();
  return (
    <Modal
      size="md"
      show={forgetPasswordModal.isShow}
      onClose={
        isAuthReady && !isAuthenticated
          ? loginModal.show
          : forgetPasswordModal.hide
      }
      header="Forget password?"
      closeButtonIcon={
        isAuthReady && !isAuthenticated ? (
          <Icon icon={arrowIosBackFill} tw="w-6 h-6" />
        ) : undefined
      }
    >
      <ForgetPasswordForm />
    </Modal>
  );
};

export default ForgetPasswordModal;
