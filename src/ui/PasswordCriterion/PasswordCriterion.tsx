import Text from '@ui/Text/Text';
import { FC } from 'react';
import { Icon } from '@iconify/react';
import tw, { styled } from 'twin.macro';

type PasswordCriteriaProps = {
  isQualified: boolean;
};

const PasswordCriterion: FC<PasswordCriteriaProps> = ({
  isQualified,
  children,
}) => {
  return (
    <StyledPassworCriterion
      component="p"
      variant="sub2"
      isQualified={isQualified}
    >
      {isQualified ? (
        <>
          <Icon icon="mdi:check" />
          <span tw="sr-only">qualified</span>
        </>
      ) : (
        <>
          <Icon icon="mdi:close" />
          <span tw="sr-only">not qualified</span>
        </>
      )}
      {children}
    </StyledPassworCriterion>
  );
};

const StyledPassworCriterion = styled(Text)<PasswordCriteriaProps>`
  ${tw`flex items-center gap-sm`};
  ${tw`text-danger`}

  ${(props) => props.isQualified && tw`text-success`}

  svg {
    ${tw`fill-current w-4 h-4`}
  }
`;

export default PasswordCriterion;
