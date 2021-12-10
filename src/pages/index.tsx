import { CustomNextPage } from '@/next';
import DefaultLayout from '@modules/layouts/DefaultLayout';
import React from 'react';

const HomePage: CustomNextPage = () => {
  return (
    <>
      <div tw="bg-primary aspect-square w-8"></div>
    </>
  );
};

HomePage.getLayout = DefaultLayout.getLayout;

export default HomePage;
