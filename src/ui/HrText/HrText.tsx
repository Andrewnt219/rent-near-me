import { PropsWithChildren } from 'react';
import tw from 'twin.macro';

const hrStyle = tw`border-t flex-grow`;

type Props = {
  className?: string;
};
function HrText({ children, className }: PropsWithChildren<Props>) {
  return (
    <div className={className} tw="flex justify-around items-center gap-xl">
      <hr css={hrStyle} />
      <div tw="-mt-xs text-dark text-sm">{children}</div>
      <hr css={hrStyle} />
    </div>
  );
}

export default HrText;
