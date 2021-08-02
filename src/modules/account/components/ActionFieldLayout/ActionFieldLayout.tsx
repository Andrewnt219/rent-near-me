import { PropsWithChildren, ReactNode } from 'react';

type Props = {
  className?: string;
  label: ReactNode;
  actionButton: ReactNode;
};
function ActionFieldLayout({ className, ...props }: PropsWithChildren<Props>) {
  return (
    <article className={className} tw="">
      <header tw="flex justify-between items-baseline">
        <h3 tw="font-semibold">{props.label}</h3>

        <div>{props.actionButton}</div>
      </header>

      {props.children}
    </article>
  );
}

export default ActionFieldLayout;
