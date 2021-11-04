import { useMemo } from 'hoist-non-react-statics/node_modules/@types/react';
import { FC, createContext, useContext, useState } from 'react';

type ActionFieldContextValue = {
  isShowingMainContent: boolean;
  showMainContent: () => void;
  showAlternativeContent: () => void;
  toggleContent: () => void;
};

const ActionFieldContext = createContext<ActionFieldContextValue | null>(null);

export const useActionField = () => {
  const actionFieldContextValue = useContext<ActionFieldContextValue | null>(
    ActionFieldContext
  );
  if (!actionFieldContextValue) throw Error('No matching AuthProvider');
  return actionFieldContextValue;
};

export const ActionFieldProvider: FC = ({ children }) => {
  const [isShowingMainContent, setIsShowingMainContent] = useState(false);

  const value = useMemo(
    () => ({
      isShowingMainContent,
      showMainContent: () => setIsShowingMainContent(true),
      showAlternativeContent: () => setIsShowingMainContent(false),
      toggleContent: () => setIsShowingMainContent((isShowing) => !isShowing),
    }),
    [isShowingMainContent]
  );

  return (
    <ActionFieldContext.Provider value={value}>
      {children}
    </ActionFieldContext.Provider>
  );
};
