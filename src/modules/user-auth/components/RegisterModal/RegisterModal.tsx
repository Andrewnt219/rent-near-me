import Modal from '@ui/Modal/Modal';
import { useModals } from '@ui/Modal/ModalContext';
import { VFC } from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';

const RegisterModal: VFC = () => {
  const { registerModal } = useModals();
  return (
    <Modal
      size="lg"
      show={registerModal.isShow}
      onClose={registerModal.hide}
      header="Register an account"
    >
      <RegisterForm />
    </Modal>
  );
};

export default RegisterModal;
