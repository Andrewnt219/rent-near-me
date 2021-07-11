import { PropsWithChildren } from 'react';
import tw from 'twin.macro';

const hrStyle = tw`border-gray-light flex-grow`;

type Props = {
  className?: string;
};
function HrText({ children, className }: PropsWithChildren<Props>) {
  return (
    <div className={className} tw="flex justify-around items-center gap-6">
      <hr css={hrStyle} />
      <div tw="-mt-1 text-gray-dark text-sm">{children}</div>
      <hr css={hrStyle} />
    </div>
  );
}

export default HrText;
