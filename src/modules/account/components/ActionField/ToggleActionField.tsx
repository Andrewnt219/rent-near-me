import { VFC, ReactNode } from 'react';
import ActionFieldLayout from './ActionFieldLayout';
import ActionFieldButton from './ActionFieldButton';
import {
  ActionFieldProvider,
  useActionField,
} from '@modules/account/components/ActionField/ActionFieldContext';
import useTranslation from 'next-translate/useTranslation';

type ActionFieldProps = {
  label: string | ReactNode;
  mainContent?: ReactNode;
  alternativeContent?: ReactNode;
  mainActionText?: string | ReactNode;
  alternativeActionText?: string | ReactNode;
  showActionButton?: boolean;
  className?: string;
};

const ToggleActionField: VFC<ActionFieldProps> = (props) => {
  return (
    <ActionFieldProvider>
      <ActionFieldContent {...props} />
    </ActionFieldProvider>
  );
};

export default ToggleActionField;

const ActionFieldContent: VFC<ActionFieldProps> = ({
  label,
  mainContent,
  alternativeContent,
  mainActionText,
  alternativeActionText,
  showActionButton = true,
  className,
}) => {
  const { t } = useTranslation();
  const { isShowingMainContent, toggleContent } = useActionField();

  return (
    <ActionFieldLayout
      label={label}
      renderedActionButton={
        <ActionFieldButton onClick={toggleContent}>
          {isShowingMainContent
            ? alternativeActionText ?? t('common:fields.toggle-action.cancel')
            : mainActionText ?? t('common:fields.toggle-action.edit')}
        </ActionFieldButton>
      }
      showActionButton={showActionButton}
      className={className}
    >
      {isShowingMainContent ? mainContent : alternativeContent}
    </ActionFieldLayout>
  );
};
