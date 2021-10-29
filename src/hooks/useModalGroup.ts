import { ModalControl } from '@common-types';
import { useState, useMemo } from 'react';

type ModalKey<Key extends string> = `${Key}Modal`;

type ModalGroupControl<Key extends string> = Record<
  ModalKey<Key>,
  ModalControl
>;

const useModalGroup = <T extends string>(
  ...modalNames: T[]
): ModalGroupControl<T> => {
  const initModalStates = Object.fromEntries(
    modalNames.map((modalName) => [modalName, false])
  );
  const [modalStates, setModalStates] = useState(initModalStates);

  return useMemo(() => {
    const showModal = (modalName: string) =>
      setModalStates({ ...initModalStates, [modalName]: true });
    const hideModal = (modalName: string) =>
      setModalStates({ ...initModalStates, [modalName]: false });
    const toggleModal = (modalName: string) =>
      setModalStates((states) => ({
        ...initModalStates,
        [modalName]: !states[modalName],
      }));

    const controls = {} as ModalGroupControl<T>;
    for (const modalName of modalNames) {
      controls[`${modalName}Modal` as ModalKey<T>] = {
        name: modalName,
        isShow: modalStates[modalName] ?? false,
        show: () => showModal(modalName),
        hide: () => hideModal(modalName),
        toggle: () => toggleModal(modalName),
      };
    }

    return controls;
  }, [initModalStates, modalNames, modalStates]);
};

export default useModalGroup;
