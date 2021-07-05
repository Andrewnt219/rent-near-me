import LoginForm from '@modules/user/LoginForm/LoginForm';
import Modal from '@ui/Modal/Modal';
import { AppProps } from 'next/app';
import React, { FC } from 'react';
import { useState } from 'react';
import DefaultLayout from 'src/layouts/DefaultLayout';

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <div>
      <h1 tw="text-h1">Hello world</h1>
      <LoginForm />
    </div>
  );
}

Home.WithLayout = ((page: AppProps['Component']) => (
  <DefaultLayout>{page}</DefaultLayout>
)) as FC;
