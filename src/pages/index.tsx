import DefaultLayout from '@modules/layouts/DefaultLayout';
// import Alert from '@ui/Alert/Alert';
import { useSnackbar } from '@ui/Snackbar/SnackbarContext';
import { ButtonPrimary } from '@ui/Button/Button';
import Snackbar from '@ui/Snackbar/Snackbar';
import React, { ReactNode } from 'react';

export default function Home() {
  const { showSuccess, showError } = useSnackbar();
  const onDismiss = () => {
    return;
  };

  return (
    <div>
      <div tw="flex flex-col gap-sm mt-lg">
        <Snackbar
          onDismiss={onDismiss}
          message="Lorem ipsum dolor sit amet."
          severity="error"
        />
        <Snackbar
          onDismiss={onDismiss}
          message="Lorem ipsum dolor sit amet."
          severity="info"
        />
        <Snackbar
          onDismiss={onDismiss}
          message="Lorem ipsum dolor sit amet."
          severity="success"
        />
        <Snackbar
          onDismiss={onDismiss}
          message="Lorem ipsum dolor sit amet."
          severity="warning"
        />
        <Snackbar
          onDismiss={onDismiss}
          message="Lorem ipsum dolor sit amet."
          severity="default"
        />
      </div>
      {/* <div tw="flex flex-col gap-sm mt-lg">
        <Alert iconDisabled={true} onDismiss={onDismiss} severity="error">
          Lorem ipsum dolor sit amet.
        </Alert>
        <Alert iconDisabled={true} onDismiss={onDismiss} severity="success">
          Lorem ipsum dolor sit amet.
        </Alert>
        <Alert iconDisabled={true} onDismiss={onDismiss} severity="info">
          Lorem ipsum dolor sit amet.
        </Alert>
        <Alert iconDisabled={true} onDismiss={onDismiss} severity="warning">
          Lorem ipsum dolor sit amet. sit amet.
        </Alert>
      </div>

      <div tw="flex flex-col gap-sm mt-lg">
        <Alert iconDisabled={true} severity="error">
          Lorem ipsum dolor sit amet.
        </Alert>
        <Alert iconDisabled={true} severity="success">
          Lorem ipsum dolor sit amet.
        </Alert>
        <Alert iconDisabled={true} severity="info">
          Lorem ipsum dolor sit amet.
        </Alert>
        <Alert iconDisabled={true} severity="warning">
          Lorem ipsum dolor sit amet. sit amet.
        </Alert>
      </div>

      <div tw="flex flex-col gap-sm mt-lg">
        <Alert severity="error">Lorem ipsum dolor sit amet.</Alert>
        <Alert severity="success">Lorem ipsum dolor sit amet.</Alert>
        <Alert severity="info">Lorem ipsum dolor sit amet.</Alert>
        <Alert severity="warning">
          Lorem ipsum dolor sit amet. sit amet. sit amet.
        </Alert>
      </div>

      <div tw="flex flex-col gap-sm mt-lg">
        <Alert onDismiss={onDismiss} severity="error">
          Lorem ipsum dolor sit amet.
        </Alert>
        <Alert onDismiss={onDismiss} severity="success">
          Lorem ipsum dolor sit amet.
        </Alert>
        <Alert onDismiss={onDismiss} severity="info">
          Lorem ipsum dolor sit amet.
        </Alert>
        <Alert onDismiss={onDismiss} severity="warning">
          Lorem ipsum dolor sit amet. sit amet.
        </Alert>
      </div> */}

      <ButtonPrimary
        size="lg"
        tw="mt-lg"
        onClick={() => showSuccess(new Date().toISOString())}
      >
        Enqueue Success
      </ButtonPrimary>
      <ButtonPrimary
        size="lg"
        tw="ml-sm"
        onClick={() => showError(new Date().toISOString())}
      >
        Enqueue Error
      </ButtonPrimary>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
