import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import useTranslation from 'next-translate/useTranslation';
import ToggleActionField from '@modules/account/components/ActionField/ToggleActionField';
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm';
dayjs.extend(relativeTime);

// TODO #55 get last updated password time
const MOCK_LAST_UPDATED_DATE = new Date('2021-08-02T09:00:00-04:00');

function PasswordActionField() {
  const { t } = useTranslation();

  return (
    <ToggleActionField
      label={t('account:security.change-password.field-label')}
      mainContent={<ChangePasswordForm />}
      alternativeContent={t('account:security.change-password.description', {
        time: dayjs(MOCK_LAST_UPDATED_DATE).fromNow(),
      })}
    />
  );
}

export default PasswordActionField;
