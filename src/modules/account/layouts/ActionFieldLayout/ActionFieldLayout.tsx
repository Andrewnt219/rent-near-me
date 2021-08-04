import { PropsWithChildren, ReactNode } from 'react';

type Props = {
  className?: string;
  label: ReactNode;
  actionButton: ReactNode;
};
function ActionFieldLayout({ className, ...props }: PropsWithChildren<Props>) {
  return (
    <article className={className}>
      <header tw="flex justify-between items-baseline">
        <h3 tw="font-semibold">{props.label}</h3>

        <div>{props.actionButton}</div>
      </header>

      <div tw="mt-sm">{props.children}</div>
    </article>
  );
}

export default ActionFieldLayout;
