import RegisterForm from '@modules/user/RegisterForm/RegisterForm';
import { AppProps } from 'next/app';
import React, { FC } from 'react';
import DefaultLayout from 'src/layouts/DefaultLayout';

export default function Home() {
  return (
    <>
      <RegisterForm />
    </>
  );
}

Home.WithLayout = ((page: AppProps['Component']) => (
  <DefaultLayout>{page}</DefaultLayout>
)) as FC;
