import { createContext, FC, useContext } from 'react';

export type TabOptionContextValue = {
  theme?: 'primary' | 'secondary';
  buttonJustify?: 'left' | 'right' | 'center' | 'between' | 'around';
  buttonGap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const TabOptionContext = createContext<TabOptionContextValue | undefined>(
  undefined
);

export const useTabOption = () => {
  const value = useContext(TabOptionContext);
  if (value === undefined) throw Error('No matching TabOptionProvider');
  return value;
};

type TabOptionProviderProps = {
  options?: TabOptionContextValue;
};
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
