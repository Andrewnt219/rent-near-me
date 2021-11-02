import { ReactNode } from 'react';
import { MdChevronRight } from 'react-icons/md';

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
      tw="p-xl w-full h-full rounded shadow-z8"
    >
      <span aria-hidden css={{ fontSize: '2em' }}>
        {props.data.icon}
      </span>

      <div tw="mt-md text-h3 font-semibold flex items-baseline gap-xs">
        {props.data.title}

        <div aria-hidden tw="" css={{ fontSize: '.75em' }}>
          <MdChevronRight />
        </div>
      </div>

      <div tw="mt-sm">{props.data.description}</div>
    </article>
  );
}

export default AccountMenuTile;
