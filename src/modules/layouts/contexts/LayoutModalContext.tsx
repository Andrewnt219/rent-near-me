import { ModalControl } from '@common-types';
import LoginForm from '@modules/user-auth/components/LoginForm/LoginForm';
import RegisterForm from '@modules/user-auth/components/RegisterForm/RegisterForm';
import Modal from '@ui/Modal/Modal';
import { createContext, FC, useContext } from 'react';
import useModalGroup from 'src/hooks/useModalGroup';

type LayoutModalContextValue = {
  loginModal?: ModalControl;
  registerModal?: ModalControl;
};

const LayoutModalContext = createContext<LayoutModalContextValue | null>(null);
export const useLayoutModal = () => {
  const modalContextValue = useContext(LayoutModalContext);
  if (!modalContextValue) throw Error('No matching LayoutProvider');
  return modalContextValue as LayoutModalContextValue;
};

export const LayoutProvider: FC = ({ children }) => {
  const value: LayoutModalContextValue = useModalGroup('login', 'register');
  const { loginModal, registerModal } = value;

  return (
    <LayoutModalContext.Provider value={value}>
      {children}
      <Modal
        size="md"
        show={loginModal?.isShow}
        onClose={loginModal?.hide}
        aria-labelledby="LoginModalTitle"
        header={<h3 id="LoginModalTitle">Log in</h3>}
      >
        <LoginForm onCreateNewAccountClick={value.registerModal?.show} />
      </Modal>
      <Modal
        size="lg"
        show={registerModal?.isShow}
        onClose={registerModal?.hide}
        aria-labelledby="RegisterModalTitle"
        header={<h3 id="RegisterModalTitle">Register an account</h3>}
      >
        <RegisterForm onAlreadyHaveAccountClick={value.loginModal?.show} />
      </Modal>
    </LayoutModalContext.Provider>
  );
};
