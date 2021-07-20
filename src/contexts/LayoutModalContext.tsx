import { createContext, useContext, FC, useState } from 'react';
import { ModalControl } from '@common-types';
import RegisterForm from '@modules/user/RegisterForm/RegisterForm';
import LoginForm from '@modules/user/LoginForm/LoginForm';
import Modal from '@ui/Modal/Modal';

type LayoutModalContextValue = {
  loginModal: ModalControl;
  registerModal: ModalControl;
};

const LayoutModalContext = createContext<LayoutModalContextValue | null>(null);
export const useLayoutModal = () => {
  const modalContextValue = useContext(LayoutModalContext);
  if (!modalContextValue) throw Error('No matching LayoutProvider');
  return modalContextValue as LayoutModalContextValue;
};

export const LayoutProvider: FC = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModel, setShowRegisterModel] = useState(false);

  const value: LayoutModalContextValue = {
    loginModal: {
      isShow: showLoginModal,
      show: () => setShowLoginModal(true),
      hide: () => setShowLoginModal(false),
      toggle: () => setShowLoginModal((isShow) => !isShow),
    },
    registerModal: {
      isShow: showRegisterModel,
      show: () => setShowRegisterModel(true),
      hide: () => setShowRegisterModel(false),
      toggle: () => setShowRegisterModel((isShow) => !isShow),
    },
  };

  return (
    <LayoutModalContext.Provider value={value}>
      {children}
      <Modal
        size="md"
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        aria-labelledby="LoginModalTitle"
        header={<h3 id="LoginModalTitle">Log in</h3>}
      >
        <LoginForm />
      </Modal>
      <Modal
        size="lg"
        show={showRegisterModel}
        onClose={() => setShowRegisterModel(false)}
        aria-labelledby="RegisterModalTitle"
        header={<h3 id="RegisterModalTitle">Register an account</h3>}
      >
        <RegisterForm />
      </Modal>
    </LayoutModalContext.Provider>
  );
};
