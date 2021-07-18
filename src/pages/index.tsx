import { AppProps } from 'next/app';
import React, { FC } from 'react';
import { useState } from 'react';
import DefaultLayout from 'src/layouts/DefaultLayout';

export default function Home() {
  return <div></div>;
}

Home.WithLayout = ((page: AppProps['Component']) => (
  <DefaultLayout>{page}</DefaultLayout>
)) as FC;
