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
  mainActionText = 'Update',
  alternativeActionText = 'Cancel',
  showActionButton = true,
  className,
}) => {
  const { isShowingMainContent, toggleContent } = useActionField();

  return (
    <ActionFieldLayout
      label={label}
      renderedActionButton={
        <ActionFieldButton onClick={toggleContent}>
          {isShowingMainContent ? alternativeActionText : mainActionText}
        </ActionFieldButton>
      }
      showActionButton={showActionButton}
      className={className}
    >
      {isShowingMainContent ? mainContent : alternativeContent}
    </ActionFieldLayout>
  );
};
