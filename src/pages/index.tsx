import React, { ReactNode } from 'react';
import DefaultLayout from 'src/layouts/DefaultLayout';
export default function Home() {
  return <div></div>;
}

Home.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
