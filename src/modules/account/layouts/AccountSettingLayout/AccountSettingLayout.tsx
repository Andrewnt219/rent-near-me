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
      tw="flex flex-col gap-xl mt-xl md:(flex-row gap-xl)"
    >
      <section tw="flex-1">{props.main}</section>

      <aside tw="md:max-w-sm flex-1">{props.aside}</aside>
    </div>
  );
}

export default AccountSettingLayout;
