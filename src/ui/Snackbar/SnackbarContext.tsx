import { ItemType } from '@common-types';
import { Duration } from '@models/constnats';
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
  showSnackError(message: ReactNode): void;
  showSnackSuccess(message: ReactNode): void;
  showSnackInfo(message: ReactNode): void;
  showSnackWarning(message: ReactNode): void;
  showSnackDefault(message: ReactNode): void;
};
const SnackbarContext = createContext<TSnackbarContext | undefined>(undefined);

type ProviderProps = {
  children: ReactNode | ReactNode[];
  timeoutInMs?: Duration;
};
const SnackbarProvider = ({
  children,
  timeoutInMs = Duration.NORMAL,
}: ProviderProps) => {
  const snackbarQueue = useQueue<TSnackbar>();

  const value: TSnackbarContext = useMemo(() => {
    const enqueue = (
      snackbar: Pick<TSnackbar, 'severity' | 'message' | 'title'>
    ) => {
      const id = nanoid(8);
      const onDismiss = () => snackbarQueue.remove(id);
      snackbarQueue.enqueue({ ...snackbar, id, onDismiss });
      setTimeout(onDismiss, timeoutInMs);
    };

    const factory =
      (severity: TSnackbar['severity']) =>
      (message: ReactNode, title?: ReactNode) =>
        enqueue({ message, severity, title });
    const showSnackError = factory('error');
    const showSnackSuccess = factory('success');
    const showSnackInfo = factory('info');
    const showSnackWarning = factory('warning');
    const showSnackDefault = factory('default');

    return {
      showSnackError,
      showSnackSuccess,
      showSnackInfo,
      showSnackWarning,
      showSnackDefault,
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
