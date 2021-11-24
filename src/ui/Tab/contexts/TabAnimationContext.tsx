import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

export type TabAnimationContextValue = {
  tabGroupRect: DOMRect | null;
  selectedButtonRect: DOMRect | null;
  setSelectedButtonRect: Dispatch<SetStateAction<DOMRect | null>>;
};

const TabAnimationContext = createContext<TabAnimationContextValue | undefined>(
  undefined
);

export const useTabAnimation = () => {
  const value = useContext(TabAnimationContext);
  if (value === undefined) throw Error('No matching TabAnimationProvider');
  return value;
};

type TabAnimationProviderProps = {
  tabGroupRect: DOMRect | null;
};
export const TabAnimationProvider: FC<TabAnimationProviderProps> = ({
  tabGroupRect,
  children,
}) => {
  const [selectedButtonRect, setSelectedButtonRect] = useState<DOMRect | null>(
    null
  );

  const value = useMemo<TabAnimationContextValue>(
    () => ({
      tabGroupRect,
      selectedButtonRect,
      setSelectedButtonRect,
    }),
    [selectedButtonRect, tabGroupRect]
  );

  return (
    <TabAnimationContext.Provider value={value}>
      {children}
    </TabAnimationContext.Provider>
  );
};
