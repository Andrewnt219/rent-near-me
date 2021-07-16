import PasswordCriterion from '@ui/PasswordCriterion/PasswordCriterion';
import { SPECIAL_CHARS } from '@utils/validate-js-utils';
import { PasswordCriteria } from '@utils/validate-password-utils';
import { VFC } from 'react';
type Props = {
  className?: string;
  passwordValidationResults: Record<PasswordCriteria, boolean>;
};
const PasswordCheckList: VFC<Props> = ({ className, ...props }) => {
  return (
    <div className={className} tw="space-y-xs">
      <PasswordCriterion
        isQualified={props.passwordValidationResults['valid-length']}
      >
        At least 8 characters
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
        Contains a number or one of these symbols {SPECIAL_CHARS}
      </PasswordCriterion>
    </div>
  );
};

export default PasswordCheckList;
