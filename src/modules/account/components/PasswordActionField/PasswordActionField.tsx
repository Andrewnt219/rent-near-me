import { ButtonGhost } from '@ui/Button/Button';
import { useState } from 'react';
import ActionFieldLayout from '../ActionFieldLayout/ActionFieldLayout';
import EditPasswordForm from '../EditPasswordForm/EditPasswordForm';

type Props = {
  className?: string;
};
function PasswordActionField({ className }: Props) {
  const [isEditMode, setIsEditMode] = useState(true);

  return (
    <ActionFieldLayout
      label="Password"
      actionButton={
        <ButtonGhost size="sm" onClick={() => setIsEditMode((prev) => !prev)}>
          Update
        </ButtonGhost>
      }
    >
      {isEditMode ? <EditPasswordForm /> : 'last updated a month ago'}
    </ActionFieldLayout>
  );
}

export default PasswordActionField;
