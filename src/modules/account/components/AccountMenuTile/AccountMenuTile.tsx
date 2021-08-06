import { ReactNode } from 'react';
import { FaChevronRight } from 'react-icons/fa';

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
    <article
      className={className}
      css={{ boxShadow: 'rgb(0 0 0 / 16%) 0px 2px 8px' }}
      tw="p-xl w-full h-full rounded"
    >
      <span aria-hidden css={{ fontSize: '2em' }}>
        {props.data.icon}
      </span>

      <div tw="mt-md text-lg font-semibold flex items-baseline gap-xs">
        {props.data.title}

        <div aria-hidden tw="" css={{ fontSize: '.75em' }}>
          <FaChevronRight />
        </div>
      </div>

      <div tw="mt-sm">{props.data.description}</div>
    </article>
  );
}

export default AccountMenuTile;
