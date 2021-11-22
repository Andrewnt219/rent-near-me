import { ModalControl } from '@common-types';
import { createContext, FC, useContext } from 'react';
import useModalGroup from 'src/hooks/useModalGroup';
import LoginModal from '@modules/user-auth/components/LoginModal/LoginModal';
import RegisterModal from '@modules/user-auth/components/RegisterModal/RegisterModal';
import ForgetPasswordModal from '@modules/user-auth/components/ForgetPasswordModal/ForgetPasswordModal';

type ModalContextValue = {
  loginModal: ModalControl;
  registerModal: ModalControl;
  forgetPasswordModal: ModalControl;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);
export const useModals = () => {
  const modalContextValue = useContext(ModalContext);
  if (modalContextValue === undefined) throw Error('No matching ModalProvider');
  return modalContextValue;
};

export const ModalProvider: FC = ({ children }) => {
  const value = useModalGroup('login', 'register', 'forgetPassword');

  return (
    <ModalContext.Provider value={value}>
      {children}
      <LoginModal />
      <RegisterModal />
      <ForgetPasswordModal />
    </ModalContext.Provider>
  );
};
