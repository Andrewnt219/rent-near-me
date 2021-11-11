import { useSnackbar } from '@ui/Snackbar/SnackbarContext';
import { ButtonPrimary } from '@ui/Button/Button';
import Snackbar from '@ui/Snackbar/Snackbar';

export default function SnackbarDocsPage() {
  const { showSnackSuccess, showSnackError } = useSnackbar();
  const onDismiss = () => {
    return;
  };

  return (
    <div>
      <div tw="flex flex-col gap-sm mt-lg">
        <Snackbar
          title="Error"
          onDismiss={onDismiss}
          message="Lorem, ipsum dolor sit amet."
          severity="error"
        />
        <Snackbar
          title="Info"
          onDismiss={onDismiss}
          message="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, eaque!"
          severity="info"
        />
        <Snackbar
          onDismiss={onDismiss}
          message="Lorem ipsum dolor sit amet."
          severity="success"
        />
        <Snackbar
          onDismiss={onDismiss}
          message="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, eaque!"
          severity="warning"
        />
        <Snackbar
          onDismiss={onDismiss}
          message="Lorem, ipsum dolor sit amet."
          severity="default"
        />
      </div>

      <ButtonPrimary
        size="lg"
        tw="mt-lg"
        onClick={() => showSnackSuccess(new Date().toISOString())}
      >
        Enqueue Success
      </ButtonPrimary>
      <ButtonPrimary
        size="lg"
        tw="ml-sm"
        onClick={() => showSnackError(new Date().toISOString())}
      >
        Enqueue Error
      </ButtonPrimary>
    </div>
  );
}
