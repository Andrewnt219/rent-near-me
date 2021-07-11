import { useLayoutModal } from '@layouts/LayoutModalContext';
import { AppProps } from 'next/app';
import React, { FC } from 'react';
import { useState } from 'react';
import DefaultLayout from 'src/layouts/DefaultLayout';

export default function Home() {
  const { loginModal, registerModal } = useLayoutModal();

  return (
    <div>
      <button onClick={(e) => loginModal.show()}>Login</button>
      <br />
      <button onClick={(e) => registerModal.show()}>Register</button>
    </div>
  );
}

Home.WithLayout = ((page: AppProps['Component']) => (
  <DefaultLayout>{page}</DefaultLayout>
)) as FC;
