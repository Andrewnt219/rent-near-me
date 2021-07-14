import LoginForm from '@modules/user/LoginForm/LoginForm';
import { AppProps } from 'next/app';
import React, { FC } from 'react';
import DefaultLayout from 'src/layouts/DefaultLayout';

export default function Home() {
  return (
    <>
      <h1 tw="text-h1">Hello world</h1>
      <LoginForm />
    </>
  );
}

Home.WithLayout = ((page: AppProps['Component']) => (
  <DefaultLayout>{page}</DefaultLayout>
)) as FC;
