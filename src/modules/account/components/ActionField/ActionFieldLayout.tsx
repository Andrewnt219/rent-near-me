import Text from '@ui/Text/Text';
import { FC, ReactNode } from 'react';

type ActionFieldLayoutProps = {
  label: string | ReactNode;
  renderedActionButton: ReactNode;
  showActionButton: boolean;
  className?: string;
};

const ActionFieldLayout: FC<ActionFieldLayoutProps> = ({
  children,
  className,
  label,
  renderedActionButton,
  showActionButton,
}) => (
  <article className={className}>
    <header tw="flex justify-between items-baseline">
      <Text component="h3" variant="sub1">
        {label}
      </Text>

      {showActionButton && <>{renderedActionButton}</>}
    </header>

    <div tw="mt-sm">{children}</div>
  </article>
);

export default ActionFieldLayout;
