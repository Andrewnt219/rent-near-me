import PasswordCriterion from '@ui/PasswordCriterion/PasswordCriterion';
import { PasswordCriteria } from '@utils/validate-password-utils';
import { VFC } from 'react';
import { Icon } from '@iconify/react';
import infoFill from '@iconify/icons-eva/info-fill';
import Tooltip from '@ui/Tooltip';
import { SPECIAL_CHARS } from '@utils/validate-js-utils';
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
        <Tooltip trigger={<Icon icon={infoFill} tw="text-info" />}>
          <pre tw="text-caption inline tracking-widest">{SPECIAL_CHARS}</pre>
        </Tooltip>
      </PasswordCriterion>
    </div>
  );
};

export default PasswordCheckList;
