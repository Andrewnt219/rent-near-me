import { FC } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
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
          <MdCheck />
          <span tw="sr-only">qualified</span>
        </>
      ) : (
        <>
          <MdClose />
          <span tw="sr-only">not qualified</span>
        </>
      )}
      {children}
    </StyledPassworCriterion>
  );
};

const StyledPassworCriterion = styled.p<PasswordCriteriaProps>`
  ${tw`text-body2 font-semibold`}
  ${tw`flex items-center gap-sm`};
  ${tw`text-danger`}

  ${(props) => props.isQualified && tw`text-success`}

  svg {
    ${tw`fill-current w-4 h-4`}
  }
`;

export default PasswordCriterion;
