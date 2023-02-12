import React from 'react';
import { useRouter } from 'next/router';
import TickIcon from '@assets/svgs/tick-icon.svg';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from './index.module.less';

const HomePage: React.FC = () => {
  const { t: translate } = useTranslation('common');
  const router = useRouter();

  return (
    <div className={styles.wrapThankYou}>
      <TickIcon />
      <p className="roboto">{translate('thank_you.application_successful')}</p>
      <p className="roboto-bold">{router.query.title}</p>
    </div>
  );
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

export default HomePage;
