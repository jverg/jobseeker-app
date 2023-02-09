import React from 'react';
import Login from '@components/login/Login';
import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const LoginPage: NextPage = () => {
  return <Login />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    return {
      props: {
        ...(await serverSideTranslations(context.locale!, ['common'])),
      },
    };
  } catch (err: any) {
    return {
      props: {
        errorCode: err.status || err?.response?.status || 500,
        ...(await serverSideTranslations(context.locale!, ['common'])),
      },
    };
  }
};

export default LoginPage;
