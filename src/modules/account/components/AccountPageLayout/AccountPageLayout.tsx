import { ReactNode } from 'react';

type Props = {
  className?: string;
  header: ReactNode;
  main: ReactNode;
  aside: ReactNode;
};
function AccountPageLayout({ className, ...props }: Props) {
  return (
    <section className={className} tw="max-w-5xl mt-2xl mx-auto">
      <header>{props.header}</header>

      <div tw="flex gap-3xl mt-2xl">
        <section tw="flex-1">{props.main}</section>

        <aside tw="max-w-sm">{props.aside}</aside>
      </div>
    </section>
  );
}

export default AccountPageLayout;
