import { FC, ReactNode } from 'react';

type ActionFieldLayoutProps = {
  label: string | ReactNode;
  actionButton: ReactNode;
  showActionButton: boolean;
  className?: string;
};

const ActionFieldLayout: FC<ActionFieldLayoutProps> = ({
  children,
  className,
  label,
  actionButton,
  showActionButton,
}) => (
  <article tw="pt-0 pb-2xl" className={className}>
    <header tw="flex justify-between items-baseline">
      <h3 tw="font-semibold">{label}</h3>

      {showActionButton && <>{actionButton}</>}
    </header>

    <div tw="mt-sm">{children}</div>
  </article>
);

export default ActionFieldLayout;
