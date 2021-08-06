import { Children, PropsWithChildren, ReactNode } from 'react';

type Props = {
  className?: string;
  separator: ReactNode;
};
function SeparatorList({
  className,
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <div className={className} tw="">
      {Children.map(children, (child, index) => (
        <>
          {child}

          {index < Children.count(children) - 1 && props.separator}
        </>
      ))}
    </div>
  );
}

export default SeparatorList;
