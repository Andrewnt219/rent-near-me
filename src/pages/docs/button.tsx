import { ReactNode } from 'react';
import DocsLayout from '@modules/layouts/DocsLayout';
import Text from '@ui/Text/Text';
import {
  ButtonGhost,
  ButtonLink,
  ButtonOutline,
  ButtonPrimary,
  ButtonSecondary,
} from '@ui/Button/Button';
import tw, { css } from 'twin.macro';

export default function ButtonDocsPage() {
  return (
    <div tw="flex">
      <div tw="flex-auto">
        <Text component="h1" variant="h2">
          Button
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
      <div tw="flex-auto">
        <Text component="h1" variant="h2">
          Link
        </Text>
      </div>
    </div>
  );
}

ButtonDocsPage.getLayout = (page: ReactNode) => {
  return <DocsLayout>{page}</DocsLayout>;
};
