import { CustomNextPage } from '@/next';
import DefaultLayout from '@modules/layouts/DefaultLayout';
import React from 'react';

const HomePage: CustomNextPage = () => {
  return <></>;
};

HomePage.getLayout = DefaultLayout.getLayout;

export default HomePage;
