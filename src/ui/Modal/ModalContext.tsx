import { ModalControl } from '@common-types';
import LoginForm from '@modules/user-auth/components/LoginForm/LoginForm';
import RegisterForm from '@modules/user-auth/components/RegisterForm/RegisterForm';
import Modal from '@ui/Modal/Modal';
import { createContext, FC, useContext } from 'react';
import useModalGroup from 'src/hooks/useModalGroup';

type ModalContextValue = {
  loginModal: ModalControl;
  registerModal: ModalControl;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);
export const useModals = () => {
  const modalContextValue = useContext(ModalContext);
  if (modalContextValue === undefined) throw Error('No matching ModalProvider');
  return modalContextValue;
};

export const ModalProvider: FC = ({ children }) => {
  const value = useModalGroup('login', 'register');

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal
        size="md"
        show={value.loginModal.isShow}
        onClose={value.loginModal.hide}
        aria-labelledby="LoginModalTitle"
        header="Log in"
      >
        <LoginForm />
      </Modal>
      <Modal
        size="lg"
        show={value.registerModal.isShow}
        onClose={value.registerModal.hide}
        aria-labelledby="RegisterModalTitle"
        header="Register an account"
      >
        <RegisterForm />
      </Modal>
    </ModalContext.Provider>
  );
};
