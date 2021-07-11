import { createContext, useContext, FC, useState } from 'react';
import RegisterForm from '@modules/user/RegisterForm/RegisterForm';
import LoginForm from '@modules/user/LoginForm/LoginForm';
import Modal from '@ui/Modal/Modal';

type ModalValue = {
  isShow: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
};

type LayoutModalContextValue = {
  loginModal: ModalValue;
  registerModal: ModalValue;
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
        aria-labelledby="LoginModalTitleId"
        header={<h3 id="LoginModalTitleId">Log in</h3>}
      >
        <LoginForm />
      </Modal>
      <Modal
        size="md"
        show={showRegisterModel}
        onClose={() => setShowRegisterModel(false)}
        aria-labelledby="RegisterModalTitleId"
        header={<h3 id="RegisterModalTitleId">Register an account</h3>}
      >
        <RegisterForm />
      </Modal>
    </LayoutModalContext.Provider>
  );
};
