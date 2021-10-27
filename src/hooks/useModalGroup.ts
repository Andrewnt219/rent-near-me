import { ModalControl } from '@common-types';
import { useState } from 'react';

const useModalGroup = (...modalNames: string[]): ModalControl[] => {
  const initModalStates: Record<string, boolean> = modalNames.reduce(
    (states, modalName) => ({ ...states, [modalName]: false }),
    {}
  );
  const [modalStates, setModalStates] = useState(initModalStates);

  const showModal = (modalName: string) =>
    setModalStates({ ...initModalStates, [modalName]: true });
  const hideModal = (modalName: string) =>
    setModalStates({ ...initModalStates, [modalName]: false });
  const toggleModal = (modalName: string) =>
    setModalStates((states) => ({
      ...initModalStates,
      [modalName]: !states[modalName],
    }));

  return modalNames.map((modalName) => ({
    name: modalName,
    isShow: modalStates[modalName] ?? false,
    show: () => showModal(modalName),
    hide: () => hideModal(modalName),
    toggle: () => toggleModal(modalName),
  }));
};

export default useModalGroup;
