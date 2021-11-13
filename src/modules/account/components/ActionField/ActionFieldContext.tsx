import { FC, createContext, useContext, useState, useMemo } from 'react';

type ActionFieldContextValue = {
  isShowingMainContent: boolean;
  showMainContent: () => void;
  showAlternativeContent: () => void;
  toggleContent: () => void;
};

const ActionFieldContext = createContext<ActionFieldContextValue | undefined>(
  undefined
);

export const useActionField = () => {
  const actionFieldContextValue = useContext(ActionFieldContext);
  if (actionFieldContextValue === undefined)
    throw Error('No matching AuthProvider');
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
