import DocsLayout from '@modules/layouts/DocsLayout';
import { useSnackbar } from '@ui/Snackbar/SnackbarContext';
import { Button } from '@ui/Button';
import Snackbar from '@ui/Snackbar/Snackbar';
import { CustomNextPage } from '@/next';

const SnackbarDocsPage: CustomNextPage = () => {
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

      <div tw="mt-lg space-x-md">
        <Button
          size="md"
          variant="primary"
          onClick={() => showSnackSuccess(new Date().toISOString())}
        >
          Enqueue Success
        </Button>
        <Button
          size="md"
          variant="primary"
          onClick={() =>
            showSnackError(
              'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad nostrum sint minus consectetur nam exercitationem eius reiciendis voluptatibus aliquam repudiandae!'
            )
          }
        >
          Enqueue Error
        </Button>
      </div>
    </div>
  );
};

SnackbarDocsPage.getLayout = DocsLayout.getLayout;

export default SnackbarDocsPage;
