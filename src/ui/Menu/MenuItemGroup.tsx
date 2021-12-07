import { Children, cloneElement, FC, Fragment, isValidElement } from 'react';

const MenuItemGroup: FC = ({ children }) => {
  const itemCount = Children.count(children);
  return (
    <>
      {Children.map(children, (child, idx) => {
        if (!isValidElement(child)) return null;
        let className = child.props.className ?? '';
        if (idx === 0) {
          className += ' Menu-PseudoGroup-FirstItem';
        }
        if (idx === itemCount - 1) {
          className += ' Menu-PseudoGroup-LastItem';
        }
        return cloneElement(child, { ...child.props, className });
      })}
      <hr className="Menu-PseudoGroup-Divider" />
    </>
  );
};

export default MenuItemGroup;
