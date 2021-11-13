import DefaultLayout from '@modules/layouts/DefaultLayout';
import React, { ReactNode } from 'react';

export default function HomePage() {
  return <></>;
}

HomePage.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
