import { createContext, FC, useContext } from 'react';

export type TabOptionContextValue = {
  /**
   * Theme of the TabGroup
   */
  theme?: 'primary' | 'secondary';
  /**
   * Alignment of the TabButtons within the flex-displayed TabHeader
   */
  buttonJustify?: 'left' | 'right' | 'center' | 'between' | 'around';
  /**
   * Size of the gaps between the TabButtons
   */
  buttonGap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

/**
 * Context for the options passed into the TabGroup by the parent component
 */
const TabOptionContext = createContext<TabOptionContextValue | undefined>(
  undefined
);

/**
 * Hook to consume {@link TabOptionContext}
 */
export const useTabOption = () => {
  const value = useContext(TabOptionContext);
  if (value === undefined) throw Error('No matching TabOptionProvider');
  return value;
};

type TabOptionProviderProps = {
  /**
   * Options passed into the TabGroup by the parent component
   */
  options?: TabOptionContextValue;
};

/**
 * Provider for {@link TabOptionContext}
 */
export const TabOptionProvider: FC<TabOptionProviderProps> = ({
  children,
  options = {},
}) => {
  return (
    <TabOptionContext.Provider value={options}>
      {children}
    </TabOptionContext.Provider>
  );
};
