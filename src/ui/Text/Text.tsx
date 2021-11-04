import { HTMLAttributes, PropsWithChildren } from 'react';
import tw, { styled } from 'twin.macro';

type Props = HTMLAttributes<HTMLHeadingElement> & {
  className?: string;
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  variant?: StyledTextProps['variant'];
};
function Text({ className, ...props }: PropsWithChildren<Props>) {
  return (
    <StyledText
      {...props}
      as={props.component ?? 'span'}
      variant={props.variant ?? 'body1'}
      className={className}
      tw=""
    >
      {props.children}
    </StyledText>
  );
}

type StyledTextProps = {
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'sub1'
    | 'sub2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'overline'
    | 'button';
};
const StyledText = styled.p<StyledTextProps>`
  ${(p) => styleVariant(p.variant)}
`;

const styleVariant = (variant: StyledTextProps['variant']) => {
  switch (variant) {
    case 'h1':
      return tw`text-h1 font-bold`;

    case 'h2':
      return tw`text-h2 font-bold`;

    case 'h3':
      return tw`text-h3 font-bold`;

    case 'h4':
      return tw`text-h4 font-bold`;

    case 'h5':
      return tw`text-h5 font-bold`;

    case 'h6':
      return tw`text-h6 font-bold`;

    case 'sub1':
      return tw`text-body1 font-semibold`;

    case 'sub2':
      return tw`text-body2 font-semibold`;

    case 'body1':
      return tw`text-body1 font-normal`;

    case 'body2':
      return tw`text-body2 font-normal`;

    case 'caption':
      return tw`text-caption font-normal`;

    case 'overline':
      return tw`text-overline font-bold tracking-wider`;

    case 'button':
      return tw`text-button font-bold`;

    default:
      return tw``;
  }
};

export default Text;
