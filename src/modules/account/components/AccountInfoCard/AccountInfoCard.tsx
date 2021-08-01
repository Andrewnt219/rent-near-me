import { PropsWithChildren, ReactNode } from 'react';

type Props = {
  className?: string;
  title: ReactNode;
  icon: ReactNode;
  footer?: ReactNode;
};
function AccountInfoCard({ className, ...props }: PropsWithChildren<Props>) {
  return (
    <article className={className} tw="">
      <header>
        <span aria-hidden>{props.icon}</span>
        <h3>{props.title}</h3>
      </header>

      {props.children}

      <footer>{props.footer}</footer>
    </article>
  );
}

export default AccountInfoCard;
