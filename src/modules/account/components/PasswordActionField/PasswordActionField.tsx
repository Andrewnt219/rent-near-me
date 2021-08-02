import { ButtonGhost } from '@ui/Button/Button';
import { useState } from 'react';
import ActionFieldLayout from '../ActionFieldLayout/ActionFieldLayout';

type Props = {
  className?: string;
};
function PasswordActionField({ className }: Props) {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <ActionFieldLayout
      label="Password"
      actionButton={
        <ButtonGhost size="sm" onClick={() => setIsEditMode((prev) => !prev)}>
          Update
        </ButtonGhost>
      }
    >
      {isEditMode ? <form>Form</form> : 'last updated a month ago'}
    </ActionFieldLayout>
  );
}

export default PasswordActionField;
