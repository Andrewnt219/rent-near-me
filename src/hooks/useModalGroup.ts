import { ModalControl } from '@common-types';
import { useMemo } from 'hoist-non-react-statics/node_modules/@types/react';
import { useState } from 'react';

export type ModalGroupControl<Keys extends string> = {
  [K in `${Keys}Modal`]: ModalControl;
};

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
      controls[`${modalName}Modal`] = {
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
