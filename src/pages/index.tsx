import LoginForm from '@modules/user/LoginForm/LoginForm';
import React from 'react';
import DefaultLayout from 'src/layouts/DefaultLayout';

export default function Home() {
  return (
    <DefaultLayout>
      <LoginForm />
    </DefaultLayout>
  );
}
