import { useCallback, useRef, useState } from 'react';
import useClickOutside from 'src/hooks/useClickOutside';

export const useUserMenuDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const blurTimerId = useRef<NodeJS.Timeout>();

  // Give some time to determine if the user is tabbing through the dropdown
  // or has actually exit the dropdown
  const closeDropdown = useCallback(() => {
    blurTimerId.current = setTimeout(() => setIsOpen(false), 50);
  }, []);

  // Open the dropdown and prevent timed closing
  const openDropdown = useCallback(() => {
    blurTimerId.current && clearTimeout(blurTimerId.current);
    setIsOpen(true);
  }, []);

  const toggleDropDown = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, wrapperRef, closeDropdown, openDropdown, toggleDropDown };
};
