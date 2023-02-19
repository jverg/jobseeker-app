import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getConfig from 'next/config';
import AppLayout from '@components/app-layout/AppLayout';
import { useRouter } from 'next/router';
import '../styles/global.css';

require('../styles/index.less');

const {
  publicRuntimeConfig: { FRONTEND_URL },
} = getConfig();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (window.location.pathname !== '/login' && !storedUser) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <Head>
        <title>Jobseeker</title>
        <link rel="icon" type="image/svg" href="/assets/svgs/kariera-logo.svg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta key="description" name="description" content="Jobseeker app" />
        <meta key="og:title" property="og:title" content="Jobseeker app" />
        <meta property="og:type" content="website" />
        <meta key="og:url" property="og:url" content={`${FRONTEND_URL}`} />
        <meta key="og:description" property="og:description" content="Jobseeker app" />
        <meta key="og:image" property="og:image" content="/assets/svgs/kariera-logo.svg" />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default appWithTranslation(MyApp);
