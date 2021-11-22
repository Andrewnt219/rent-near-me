import { VFC } from 'react';
import { useModals } from '@ui/Modal/ModalContext';
import Modal from '@ui/Modal/Modal';
import LoginForm from '../LoginForm/LoginForm';

const LoginModal: VFC = () => {
  const { loginModal } = useModals();
  return (
    <Modal
      size="md"
      show={loginModal.isShow}
      onClose={loginModal.hide}
      header="Log in"
    >
      <LoginForm />
    </Modal>
  );
};

export default LoginModal;
