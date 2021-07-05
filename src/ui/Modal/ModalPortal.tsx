import { useState } from 'react';
import { useEffect } from 'react';
import { FC } from 'react';
import { createPortal } from 'react-dom';

const ModalPortal: FC = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  return mounted
    ? createPortal(
        children,
        document.querySelector('#ModalContainer') as Element
      )
    : null;
};

export default ModalPortal;
