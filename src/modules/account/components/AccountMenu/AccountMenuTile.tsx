import { Icon } from '@iconify/react';
import { ReactNode } from 'react';

type Props = {
  className?: string;
  data: {
    title: ReactNode;
    icon: ReactNode;
    description: ReactNode;
  };
};
function AccountMenuTile({ className, ...props }: Props) {
  return (
    <article className={className} tw="p-lg w-full h-full rounded shadow-z8">
      <span aria-hidden tw="text-[length: 2em]">
        {props.data.icon}
      </span>

      <div tw="mt-sm text-h4 font-semibold flex items-baseline gap-xs">
        {props.data.title}
        <div aria-hidden tw="text-[length: 0.75em]">
          <Icon icon="mdi:chevron-right" />
        </div>
      </div>

      <div tw="mt-md">{props.data.description}</div>
    </article>
  );
}

export default AccountMenuTile;
