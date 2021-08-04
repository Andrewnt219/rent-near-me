import { ReactNode } from 'react';

type Props = {
  className?: string;
  main: ReactNode;
  aside: ReactNode;
};
function AccountSettingLayout({ className, ...props }: Props) {
  return (
    <div
      className={className}
      tw="flex flex-col gap-2xl mt-2xl md:(flex-row gap-4xl)"
    >
      <section tw="flex-1">{props.main}</section>

      <aside tw="max-w-sm flex-1">{props.aside}</aside>
    </div>
  );
}

export default AccountSettingLayout;
