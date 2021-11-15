import { VFC } from 'react';
import FlashingThreeDots from './variants/FlashingThreeDots.';

export type LoadingAnimationProps = {
  theme?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
};

export type LoadingIndicatorProps = LoadingAnimationProps & {
  variant: 'FlashingThreeDots';
};

const LoadingIndicator: VFC<LoadingIndicatorProps> = ({
  variant,
  ...props
}) => {
  switch (variant) {
    case 'FlashingThreeDots':
      return <FlashingThreeDots {...props} />;
  }
};

export default LoadingIndicator;
