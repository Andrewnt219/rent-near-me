import { useTabsContext } from '@reach/tabs';

type UseTabGroupHook = () => {
  /**
   * Value of the `id` attribute of the TabGroup
   */
  id: string;
  /**
   * The 0-based index of the currently selected Tab
   */
  selectedTab: number;
  /**
   * The 0-based index of the currently focused Tab
   */
  focusedTab: number;
};

/**
 * Hook to access the internal states of the TabGroup
 */
const useTabGroup: UseTabGroupHook = () => {
  const { id, focusedIndex, selectedIndex } = useTabsContext();
  return {
    id,
    selectedTab: selectedIndex,
    focusedTab: focusedIndex,
  };
};

export default useTabGroup;
