import { FC } from 'react';
import { IoCheckmarkOutline, IoCloseOutline } from 'react-icons/io5';
import tw, { styled } from 'twin.macro';

type PasswordCriteriaProps = {
  isQualified: boolean;
};

const PasswordCriterion: FC<PasswordCriteriaProps> = ({
  isQualified,
  children,
}) => {
  return (
    <StyledPassworCriteria isQualified={isQualified}>
      {isQualified ? <IoCheckmarkOutline /> : <IoCloseOutline />}
      {children}
    </StyledPassworCriteria>
  );
};

const StyledPassworCriteria = styled.p<PasswordCriteriaProps>`
  ${tw`text-xs font-semibold`}
  ${tw`flex items-center gap-sm`};
  ${tw`text-danger`}

  ${(props) => props.isQualified && tw`text-success`}

  svg {
    ${tw`fill-current w-4 h-4`}
  }
`;

export default PasswordCriterion;
