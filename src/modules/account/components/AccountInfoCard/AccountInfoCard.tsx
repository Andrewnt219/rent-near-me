import { PropsWithChildren, ReactNode } from 'react';
import tw, { styled } from 'twin.macro';
import AccountInfoCardGroup from '../AccountInfoCardGroup/AccountInfoCardGroup';

type Props = {
  className?: string;
  title: ReactNode;
  icon: ReactNode;
  footer?: ReactNode;
};
function AccountInfoCard({ className, ...props }: PropsWithChildren<Props>) {
  return (
    <StyledWrapper className={className} tw="">
      <header tw="text-lg">
        <span aria-hidden css={{ fontSize: '1.75em' }}>
          {props.icon}
        </span>
        <h3 tw="mt-sm font-semibold">{props.title}</h3>
      </header>

      <div tw="mt-md">{props.children}</div>

      <footer>{props.footer}</footer>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.article`
  ${tw`border px-xl py-2xl`}

  ${AccountInfoCardGroup} & {
    ${tw`not-first:border-t-0 not-last:border-b-0 relative`}

    &:not(:last-child)::after {
      ${tw`content absolute bottom-0 left-md block w-16 h-px bg-bordercolor`}
    }
  }
`;

export default AccountInfoCard;
