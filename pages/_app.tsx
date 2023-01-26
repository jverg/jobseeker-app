import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import getConfig from 'next/config';
import AppLayout from "@components/app-layout/AppLayout";
import '../styles/global.css';
require('../styles/index.less');

const {
    publicRuntimeConfig: { FRONTEND_URL },
} = getConfig();

function MyApp({ Component, pageProps }: AppProps) {

    return (
        <>
            <Head>
                <title>Jobseeker</title>
                <link rel="icon" type="image/svg"  href="/assets/svgs/kariera-logo.svg" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta key="description" name="description" content="Jobseeker app" />
                <meta key="og:title" property="og:title" content="Jobseeker app" />
                <meta property="og:type" content="website" />
                <meta key="og:url" property="og:url" content={`${FRONTEND_URL}`} />
                <meta key="og:description" property="og:description" content="Jobseeker app" />
                <meta key="og:image" property="og:image" content={`/assets/svgs/kariera-logo.svg`} />
                <link rel="preload" href="/fonts/Cera-Pro-Bold.otf" as="font" crossOrigin="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </>
    );
}

// export const getServerSideProps = async ({ locale }: { locale: string }) => ({
//     props: {
//         ...(await serverSideTranslations(locale, ['common', 'login', 'applicants', 'positions', 'home', 'company'])),
//     },
// });

// export default appWithTranslation(MyApp);
export default MyApp;
