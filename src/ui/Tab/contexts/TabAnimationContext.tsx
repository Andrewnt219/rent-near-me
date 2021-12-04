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
  /**
   * A DOMRect used as the priciple element to position the SelectedTabIndicator around
   */
  principleRect: DOMRect | null;
  /**
   * The DOMRect of the currently selected TabButton
   */
  selectedButtonRect: DOMRect | null;
  /**
   * Setter for the DOMRect of the currently selected TabButton
   */
  setSelectedButtonRect: Dispatch<SetStateAction<DOMRect | null>>;
};

/**
 * Context for animation-related states of SelectedTabIndicator
 */
const TabAnimationContext = createContext<TabAnimationContextValue | undefined>(
  undefined
);

/**
 * Hook to consume {@link TabAnimationContext}
 */
export const useTabAnimation = () => {
  const value = useContext(TabAnimationContext);
  if (value === undefined) throw Error('No matching TabAnimationProvider');
  return value;
};

type TabAnimationProviderProps = {
  /**
   * A DOMRect used as the priciple element to position the SelectedTabIndicator around
   */
  principleRect: TabAnimationContextValue['principleRect'];
};

/**
 * Provider for {@link TabAnimationContext}
 */
export const TabAnimationProvider: FC<TabAnimationProviderProps> = ({
  principleRect,
  children,
}) => {
  const [selectedButtonRect, setSelectedButtonRect] = useState<DOMRect | null>(
    null
  );

  const value = useMemo<TabAnimationContextValue>(
    () => ({
      principleRect,
      selectedButtonRect,
      setSelectedButtonRect,
    }),
    [selectedButtonRect, principleRect]
  );

  return (
    <TabAnimationContext.Provider value={value}>
      {children}
    </TabAnimationContext.Provider>
  );
};
