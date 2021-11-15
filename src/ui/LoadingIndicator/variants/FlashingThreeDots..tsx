import { VFC } from 'react';
import tw, { styled } from 'twin.macro';
import { LoadingAnimationProps } from '..';

const FlashingThreeDots: VFC<LoadingAnimationProps> = (props) => (
  <FlashingDotsContainer {...props}>
    {[...new Array(3)].map((val, idx) => (
      <FlashingDot key={idx} index={idx} />
    ))}
  </FlashingDotsContainer>
);

export default FlashingThreeDots;

const FlashingDotsContainer = styled.div<LoadingAnimationProps>`
  ${tw`flex items-center justify-center`}
  ${(p) => getGapBySize(p.size)}
  & > span {
    ${(p) => getBgColorByVariant(p.theme)}
    ${(p) => getDimensionBySize(p.size)}
  }
`;

type FlashingDotProps = {
  index: number;
};
const FlashingDot = styled.span<FlashingDotProps>`
  ${tw`rounded-full animate-pulse`}
  animation-duration: 1250ms;
  animation-delay: ${(p) => p.index * 150}ms;
`;

const getGapBySize = (size?: LoadingAnimationProps['size']) => {
  if (size === 'sm') {
    return tw`gap-1`;
  }
  if (size === 'lg') {
    return tw`gap-3`;
  }
  return tw`gap-2`;
};

const getBgColorByVariant = (theme?: LoadingAnimationProps['theme']) => {
  if (theme === 'secondary') {
    return tw`bg-secondary`;
  }
  return tw`bg-primary`;
};

const getDimensionBySize = (size: LoadingAnimationProps['size']) => {
  if (size === 'sm') {
    return tw`w-2 h-2`;
  }
  if (size === 'lg') {
    return tw`w-4 h-4`;
  }
  return tw`w-3 h-3`;
};
