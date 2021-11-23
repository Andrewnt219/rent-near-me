import {
  useTabsContext as useReachTabsContext,
  TabsContextValue as ReachTabsContextValue,
} from '@reach/tabs';
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

export type TabSectionContextValue = ReachTabsContextValue & {
  selectedButtonRect: DOMRect | null;
  setSelectedButtonRect: Dispatch<SetStateAction<DOMRect | null>>;
  theme: 'primary' | 'secondary';
};

const TabSectionContext = createContext<TabSectionContextValue | undefined>(
  undefined
);

export const useTabSection = () => {
  const tabContextValue = useContext(TabSectionContext);
  if (tabContextValue === undefined) throw Error('No matching TabProvider');
  return tabContextValue;
};

type TabSectionProviderProps = {
  theme: TabSectionContextValue['theme'];
};
export const TabSectionProvider: FC<TabSectionProviderProps> = ({
  theme,
  children,
}) => {
  const [selectedButtonRect, setSelectedButtonRect] = useState<DOMRect | null>(
    null
  );

  const reachTabsContextValue = useReachTabsContext();
  const value = useMemo<TabSectionContextValue>(
    () => ({
      ...reachTabsContextValue,
      selectedButtonRect,
      setSelectedButtonRect,
      theme,
    }),
    [reachTabsContextValue, selectedButtonRect, theme]
  );

  return (
    <TabSectionContext.Provider value={value}>
      {children}
    </TabSectionContext.Provider>
  );
};
