import { useTabsContext } from '@reach/tabs';

const useTabGroup = () => {
  const { id, focusedIndex, selectedIndex } = useTabsContext();
  return {
    id,
    selectedTab: selectedIndex,
    focusedTab: focusedIndex,
  };
};

export default useTabGroup;
