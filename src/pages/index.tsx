import LoginForm from '@modules/user/LoginForm/LoginForm';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import React, { FC } from 'react';
import DefaultLayout from 'src/layouts/DefaultLayout';

export default function Home() {
  return (
    <>
      <LoginForm />
    </>
  );
}

Home.WithLayout = ((page: AppProps['Component']) => (
  <DefaultLayout>{page}</DefaultLayout>
)) as FC;
