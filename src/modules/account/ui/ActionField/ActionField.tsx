import { VFC, ReactNode } from 'react';
import ActionFieldLayout from './ActionFieldLayout';
import ActionFieldButton from './ActionFieldButton';
import {
  ActionFieldProvider,
  useActionField,
} from '@modules/account/contexts/ActionFieldContext';

type ActionFieldProps = {
  label: string | ReactNode;
  mainContent?: ReactNode;
  alternativeContent?: ReactNode;
  mainActionText?: string | ReactNode;
  alternativeActionText?: string | ReactNode;
  showActionButton?: boolean;
};
const ActionField: VFC<ActionFieldProps> = (props) => {
  return (
    <ActionFieldProvider>
      <ActionFieldContent {...props} />
    </ActionFieldProvider>
  );
};

export default ActionField;

const ActionFieldContent: VFC<ActionFieldProps> = ({
  label,
  mainContent = <></>,
  alternativeContent = <></>,
  mainActionText = 'Update',
  alternativeActionText = 'Cancel',
  showActionButton = true,
}) => {
  const { isShowingMainContent, toggleContent } = useActionField();

  return (
    <ActionFieldLayout
      label={label}
      actionButton={
        <ActionFieldButton onClick={toggleContent}>
          {isShowingMainContent ? (
            <>{alternativeActionText}</>
          ) : (
            <>{mainActionText}</>
          )}
        </ActionFieldButton>
      }
      showActionButton={showActionButton}
    >
      {isShowingMainContent ? <>{mainContent}</> : <>{alternativeContent}</>}
    </ActionFieldLayout>
  );
};
