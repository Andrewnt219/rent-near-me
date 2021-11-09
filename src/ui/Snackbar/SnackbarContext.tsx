import { ItemType } from '@common-types';
import { nanoid } from 'nanoid';
import React, {
  ComponentProps,
  createContext,
  ReactNode,
  useContext,
  useMemo,
} from 'react';
import { useQueue } from 'src/hooks/useQueue';
import SnackbarGroup from './SnackbarGroup';

type TSnackbar = ItemType<ComponentProps<typeof SnackbarGroup>['snacks']>;
type TSnackbarContext = {
  showErrorSnack(message: ReactNode): void;
  showSuccessSnack(message: ReactNode): void;
  showInfoSnack(message: ReactNode): void;
  showWarningSnack(message: ReactNode): void;
  showDefaultSnack(message: ReactNode): void;
};
const SnackbarContext = createContext<TSnackbarContext | undefined>(undefined);

type ProviderProps = {
  children: ReactNode | ReactNode[];
  timeoutInMs?: number;
};
const SnackbarProvider = ({ children, timeoutInMs = 7000 }: ProviderProps) => {
  const snackbarQueue = useQueue<TSnackbar>();

  const value: TSnackbarContext = useMemo(() => {
    const enqueue = (
      snackbar: Pick<TSnackbar, 'severity' | 'message' | 'title'>
    ) => {
      const id = nanoid(8);
      const onDismiss = () => snackbarQueue.remove(id);
      snackbarQueue.enqueue({ ...snackbar, id, onDismiss });
      setTimeout(snackbarQueue.dequeue, timeoutInMs);
    };

    const factory =
      (severity: TSnackbar['severity']) =>
      (message: ReactNode, title?: ReactNode) =>
        enqueue({ message, severity, title });
    const showErrorSnack = factory('error');
    const showSuccessSnack = factory('success');
    const showInfoSnack = factory('warning');
    const showWarningSnack = factory('info');
    const showDefaultSnack = factory('default');

    return {
      showErrorSnack,
      showSuccessSnack,
      showInfoSnack,
      showWarningSnack,
      showDefaultSnack,
    };
  }, [snackbarQueue, timeoutInMs]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <SnackbarGroup
        tw="z-10 fixed top-sm right-md"
        snacks={snackbarQueue.items}
      />
    </SnackbarContext.Provider>
  );
};

const useSnackbar = (): TSnackbarContext => {
  const context = useContext(SnackbarContext);

  if (context === undefined) {
    throw new Error('Must be used within SnackbarContext');
  }

  return context;
};

export { SnackbarProvider, useSnackbar };
