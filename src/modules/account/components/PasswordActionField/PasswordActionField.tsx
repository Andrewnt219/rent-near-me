import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import useTranslation from 'next-translate/useTranslation';
import ActionField from '@modules/account/ui/ActionField/ActionField';
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm';
dayjs.extend(relativeTime);

// TODO #55 get last updated password time
const MOCK_LAST_UPDATED_DATE = new Date('2021-08-02T09:00:00-04:00');
type Props = {
  className?: string;
};
function PasswordActionField({ className }: Props) {
  const { t } = useTranslation();

  return (
    <ActionField
      label={t('account:security.edit-password.field-label')}
      mainContent={<ChangePasswordForm />}
      alternativeContent={t('account:security.edit-password.description', {
        time: dayjs(MOCK_LAST_UPDATED_DATE).fromNow(),
      })}
    />
  );
}

export default PasswordActionField;
