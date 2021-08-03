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
    <StyledPassworCriterion isQualified={isQualified}>
      {isQualified ? (
        <>
          <IoCheckmarkOutline />
          <span tw="sr-only">qualified</span>
        </>
      ) : (
        <>
          <IoCloseOutline />
          <span tw="sr-only">not qualified</span>
        </>
      )}
      {children}
    </StyledPassworCriterion>
  );
};

const StyledPassworCriterion = styled.p<PasswordCriteriaProps>`
  ${tw`text-xs font-semibold`}
  ${tw`flex items-center gap-sm`};
  ${tw`text-danger`}

  ${(props) => props.isQualified && tw`text-success`}

  svg {
    ${tw`fill-current w-4 h-4`}
  }
`;

export default PasswordCriterion;
