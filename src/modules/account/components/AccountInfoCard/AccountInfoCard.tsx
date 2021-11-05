import Text from '@ui/Text/Text';
import { PropsWithChildren, ReactNode } from 'react';
import tw, { styled } from 'twin.macro';
import AccountInfoCardGroup from './AccountInfoCardGroup';

type Props = {
  className?: string;
  title: ReactNode;
  icon: ReactNode;
  footer?: ReactNode;
};
function AccountInfoCard({ className, ...props }: PropsWithChildren<Props>) {
  return (
    <StyledWrapper className={className} tw="">
      <header>
        <Text component="span" aria-hidden tw="text-[length:2.5em]">
          {props.icon}
        </Text>

        <Text component="h3" variant="h4" tw="mt-sm">
          {props.title}
        </Text>
      </header>

      <div tw="mt-md">{props.children}</div>

      <footer>{props.footer}</footer>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.article`
  ${tw`border px-lg py-xl`}

  ${AccountInfoCardGroup} & {
    ${tw`not-first:border-t-0 not-last:border-b-0 relative`}

    &:not(:last-child)::after {
      ${tw`content absolute bottom-0 left-lg block w-16 border-b`}
    }
  }
`;

export default AccountInfoCard;
