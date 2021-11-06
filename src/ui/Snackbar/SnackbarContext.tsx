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
import SnackbarList from './SnackbarList';

type TSnackbar = ItemType<ComponentProps<typeof SnackbarList>['snacks']>;
type TSnackbarContext = {
  enqueue(alert: Pick<TSnackbar, 'severity' | 'message'>): void;
  showError(message: ReactNode): void;
  showSuccess(message: ReactNode): void;
};
const SnackbarContext = createContext<TSnackbarContext | undefined>(undefined);

type ProviderProps = {
  children: ReactNode | ReactNode[];
  timeoutInMs?: number;
};
const SnackbarProvider = ({ children, timeoutInMs = 7000 }: ProviderProps) => {
  const snackbarQueue = useQueue<TSnackbar>();

  const value: TSnackbarContext = useMemo(() => {
    const enqueue: TSnackbarContext['enqueue'] = (snackbar) => {
      const id = nanoid(8);
      const onDismiss = () => snackbarQueue.remove(id);
      snackbarQueue.enqueue({ ...snackbar, id, onDismiss });
      setTimeout(snackbarQueue.dequeue, timeoutInMs);
    };

    const factory = (severity: TSnackbar['severity']) => (message: ReactNode) =>
      enqueue({ message, severity });
    const showError: TSnackbarContext['showError'] = factory('error');
    const showSuccess: TSnackbarContext['showSuccess'] = factory('success');

    return { enqueue, showError, showSuccess };
  }, [snackbarQueue, timeoutInMs]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <SnackbarList
        tw="z-20 fixed top-sm right-md"
        snacks={snackbarQueue.items}
      />
    </SnackbarContext.Provider>
  );
};

const useSnackbarContext = (): TSnackbarContext => {
  const context = useContext(SnackbarContext);

  if (context === undefined) {
    throw new Error('Must be use within AlertContext');
  }

  return context;
};

export { SnackbarProvider, useSnackbarContext };
