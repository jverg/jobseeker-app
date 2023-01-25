import React from 'react';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import Login from '@components/auth-components/login/Login';
// import { useTranslation } from 'next-i18next';
// import AuthLayout from '@components/auth-components/auth-layout/AuthLayout';

const LoginPage: React.FC = () => {
    // const { t: translate } = useTranslation(['login']);

    return (
        <p style={{ color: 'blue' }}>This is login page</p>
    );
};

// export const getServerSideProps = async ({ locale }: { locale: string }) => {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, ['common', 'login'])),
//         },
//     };
// };

export default LoginPage;
