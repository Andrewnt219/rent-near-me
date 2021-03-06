import Text from '@ui/Text/Text';
import { FC } from 'react';
import { Icon } from '@iconify/react';
import closeCircleFill from '@iconify/icons-eva/close-circle-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
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
      <span>
        {isQualified ? (
          <>
            <Icon icon={checkmarkCircle2Fill} />
            <span tw="sr-only">qualified</span>
          </>
        ) : (
          <>
            <Icon icon={closeCircleFill} />
            <span tw="sr-only">not qualified</span>
          </>
        )}
      </span>

      {children}
    </StyledPassworCriterion>
  );
};

const StyledPassworCriterion = styled(Text)<PasswordCriteriaProps>`
  ${tw`flex items-center gap-xs`};
  ${tw`text-danger`}

  ${(props) => props.isQualified && tw`text-success`}

  svg {
    ${tw`fill-current w-4 h-4`}
  }
`;

export default PasswordCriterion;
