import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import ActionFieldLayout from '../../layouts/ActionFieldLayout/ActionFieldLayout';
import ActionFieldButton from '../ActionFieldButton/ActionFieldButton';
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm';
dayjs.extend(relativeTime);

// TODO #55 get last updated password time
const MOCK_LAST_UPDATED_DATE = new Date('2021-08-02T09:00:00-04:00');
type Props = {
  className?: string;
};
function PasswordActionField({ className }: Props) {
  const { t } = useTranslation();
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <ActionFieldLayout
      label={t('account:security.edit-password.field-label')}
      actionButton={
        <ActionFieldButton onClick={() => setIsEditMode((prev) => !prev)}>
          {isEditMode
            ? t('account:security.edit-password.cancel-button')
            : t('account:security.edit-password.action-button')}
        </ActionFieldButton>
      }
    >
      {isEditMode ? (
        <ChangePasswordForm />
      ) : (
        t('account:security.edit-password.description', {
          time: dayjs(MOCK_LAST_UPDATED_DATE).fromNow(),
        })
      )}
    </ActionFieldLayout>
  );
}

export default PasswordActionField;
