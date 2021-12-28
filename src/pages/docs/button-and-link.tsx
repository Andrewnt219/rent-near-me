import DocsLayout from '@modules/layouts/DocsLayout';
import Text from '@ui/Text/Text';
import { Button } from '@ui/Button';
import { Link } from '@ui/Button/Link';
import { CustomNextPage } from '@/next';

const ButtonAndLinkDocsPage: CustomNextPage = () => {
  return (
    <div tw="flex">
      <ButtonDocs />
      <LinkDocs />
    </div>
  );
};

ButtonAndLinkDocsPage.getLayout = DocsLayout.getLayout;

export default ButtonAndLinkDocsPage;

const ButtonDocs = () => (
  <div tw="flex-auto">
    <Text component="h1" variant="h2">
      Button (<pre tw="inline">{'<button>'} tag</pre>)
    </Text>
    <div tw="space-y-2">
      <div>
        <Button variant="primary" tw="w-32" size="md">
          Primary
        </Button>
      </div>
      <div>
        <Button variant="secondary" tw="w-32" size="md">
          Secondary
        </Button>
      </div>
      <div>
        <Button variant="outline" tw="w-32" size="md">
          Outline
        </Button>
      </div>
      <div>
        <Button variant="ghost" tw="w-32" size="md">
          Ghost
        </Button>
      </div>
      <div>
        <Button variant="link" tw="w-32" size="md">
          Link
        </Button>
      </div>
    </div>
  </div>
);

const LinkDocs = () => (
  <div tw="flex-auto">
    <Text component="h1" variant="h2">
      Link (<pre tw="inline">{'<a>'} tag</pre>)
    </Text>
    <div tw="space-y-2">
      <div>
        <Link variant="primary" href="/" tw="w-32" size="md">
          Primary
        </Link>
      </div>
      <div>
        <Link variant="secondary" href="/" tw="w-32" size="md">
          Secondary
        </Link>
      </div>
      <div>
        <Link variant="outline" href="/" tw="w-32" size="md">
          Outline
        </Link>
      </div>
      <div>
        <Link variant="ghost" href="/" tw="w-32" size="md">
          Ghost
        </Link>
      </div>
      <div>
        <Link variant="link" href="/" tw="w-32" size="md">
          Link
        </Link>
      </div>
    </div>
  </div>
);
