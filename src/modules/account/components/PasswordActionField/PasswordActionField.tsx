import { ButtonSimple } from '@ui/Button/Button';
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
      actionButton={<ButtonSimple>Update</ButtonSimple>}
    >
      {isEditMode ? <form>Form</form> : 'last updated a month ago'}
    </ActionFieldLayout>
  );
}

export default PasswordActionField;
