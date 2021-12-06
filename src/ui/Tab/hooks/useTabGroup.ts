import { useTabsContext } from '@reach/tabs';

/**
 * Hook to access the internal states of the TabGroup
 */
const useTabGroup = () => {
  const { id, focusedIndex, selectedIndex } = useTabsContext();
  return {
    id,
    selectedTab: selectedIndex,
    focusedTab: focusedIndex,
  };
};

export default useTabGroup;
