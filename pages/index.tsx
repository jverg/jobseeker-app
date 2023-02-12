import React from 'react';
import JobsList from '@components/jobs-list/JobsList';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from './index.module.less';

const HomePage: React.FC = () => {
  return (
    <div className={styles.wrapHomePage}>
      <JobsList />
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
