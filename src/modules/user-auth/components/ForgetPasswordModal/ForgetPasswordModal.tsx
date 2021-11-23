import { VFC } from 'react';
import { useModals } from '@ui/Modal/ModalContext';
import Modal from '@ui/Modal/Modal';
import ForgetPasswordForm from '../ForgetPasswordForm/ForgetPasswordForm';
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';

const ForgetPasswordModal: VFC = () => {
  const { isAuthenticated } = useAuth();
  const { forgetPasswordModal, loginModal } = useModals();
  return (
    <Modal
      size="md"
      show={forgetPasswordModal.isShow}
      onClose={isAuthenticated ? forgetPasswordModal.hide : loginModal.show}
      header="Forget password?"
      closeButtonIcon={
        isAuthenticated ? undefined : (
          <Icon icon={arrowIosBackFill} tw="w-6 h-6" />
        )
      }
    >
      <ForgetPasswordForm />
    </Modal>
  );
};

export default ForgetPasswordModal;
