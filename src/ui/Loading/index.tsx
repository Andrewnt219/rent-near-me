import { VFC } from 'react';
import FlashingThreeDots from './animations/FlashingThreeDots.';

export type LoadingAnimationProps = {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
};

export type LoadingProps = LoadingAnimationProps & {
  animation: 'FlashingThreeDots';
};

const Loading: VFC<LoadingProps> = ({ animation, ...props }) => {
  switch (animation) {
    case 'FlashingThreeDots':
      return <FlashingThreeDots {...props} />;
  }
};

export default Loading;
