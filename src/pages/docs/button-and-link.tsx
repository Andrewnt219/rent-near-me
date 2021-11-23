import DocsLayout from '@modules/layouts/DocsLayout';
import Text from '@ui/Text/Text';
import {
  ButtonGhost,
  ButtonLink,
  ButtonOutline,
  ButtonPrimary,
  ButtonSecondary,
} from '@ui/Button/Button';
import {
  LinkSimple,
  LinkPrimary,
  LinkSecondary,
  LinkOutline,
  LinkGhost,
} from '@ui/Button/Link';
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
        <ButtonPrimary tw="w-32" size="md">
          Primary
        </ButtonPrimary>
      </div>
      <div>
        <ButtonSecondary tw="w-32" size="md">
          Secondary
        </ButtonSecondary>
      </div>
      <div>
        <ButtonOutline tw="w-32" size="md">
          Outline
        </ButtonOutline>
      </div>
      <div>
        <ButtonGhost tw="w-32" size="md">
          Ghost
        </ButtonGhost>
      </div>
      <div>
        <ButtonLink tw="w-32" size="md">
          Link
        </ButtonLink>
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
        <LinkPrimary href="/" tw="w-32" size="md">
          Primary
        </LinkPrimary>
      </div>
      <div>
        <LinkSecondary href="/" tw="w-32" size="md">
          Secondary
        </LinkSecondary>
      </div>
      <div>
        <LinkOutline href="/" tw="w-32" size="md">
          Outline
        </LinkOutline>
      </div>
      <div>
        <LinkGhost href="/" tw="w-32" size="md">
          Ghost
        </LinkGhost>
      </div>
      <div>
        <LinkSimple href="/" tw="w-32" size="md">
          Simple
        </LinkSimple>
      </div>
    </div>
  </div>
);
