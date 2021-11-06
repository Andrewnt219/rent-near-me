import DefaultLayout from '@modules/layouts/DefaultLayout';
// import Alert from '@ui/Alert/Alert';
import { useSnackbarContext } from '@ui/Snackbar/SnackbarContext';
import { ButtonPrimary } from '@ui/Button/Button';
import Snackbar from '@ui/Snackbar/Snackbar';
import React, { ReactNode } from 'react';

export default function Home() {
  const { showSuccess, showError } = useSnackbarContext();
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
        <Alert
          onDismiss={onDismiss}
          message="Lorem ipsum dolor sit amet."
          severity="error"
        />
        <Alert
          onDismiss={onDismiss}
          message="Lorem ipsum dolor sit amet."
          severity="success"
        />
        <Alert
          onDismiss={onDismiss}
          message="Lorem ipsum dolor sit amet."
          severity="info"
        />
        <Alert
          onDismiss={onDismiss}
          message="Lorem ipsum dolor sit amet."
          severity="warning"
        />
      </div>

      <div tw="flex gap-sm mt-lg">
        <Alert
          onDismiss={onDismiss}
          message="Lorem ipsum dolor sit amet."
          severity="error"
        />
        <Alert
          onDismiss={onDismiss}
          message="Lorem ipsum dolor sit amet."
          severity="success"
        />
        <Alert
          onDismiss={onDismiss}
          message="Lorem ipsum dolor sit amet."
          severity="info"
        />
        <Alert
          onDismiss={onDismiss}
          message="Lorem ipsum dolor sit amet."
          severity="warning"
        />
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
