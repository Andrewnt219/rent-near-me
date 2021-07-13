import { FC } from 'react';
import { SPECIAL_CHARS } from '@utils/validate-js-utils';
import { PasswordCriteria } from '@utils/validate-password-utils';
import PasswordCriterion from '@ui/PasswordCriterion/PasswordCriterion';
import { BsQuestionCircleFill } from 'react-icons/bs';

type Props = {
  className?: string;
  passwordValidationResults: Record<PasswordCriteria, boolean>;
};
const PasswordCheckList: FC<Props> = ({ className, ...props }) => {
  return (
    <div className={className} tw="space-y-xs">
      <PasswordCriterion
        isQualified={props.passwordValidationResults['valid-length']}
      >
        Contains at least 8 characters
      </PasswordCriterion>

      <PasswordCriterion
        isQualified={
          props.passwordValidationResults['contains-lower-case'] &&
          props.passwordValidationResults['contains-upper-case']
        }
      >
        Contains a lowercase letter and an uppercase letter
      </PasswordCriterion>

      <PasswordCriterion
        isQualified={
          props.passwordValidationResults['contains-special-char-or-number']
        }
      >
        Contains a number or a special character
        <BsQuestionCircleFill tw="text-info text-xs" />
      </PasswordCriterion>
    </div>
  );
};

export default PasswordCheckList;
