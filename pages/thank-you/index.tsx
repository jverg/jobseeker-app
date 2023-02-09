import React from 'react';
import TickIcon from '@assets/svgs/tick-icon.svg';
import styles from './index.module.less';
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const HomePage: React.FC = () => {
  return (
    <div className={styles.wrapThankYou}>
      <TickIcon />
      <p className="h3">Application successful</p>
      <p className="h3">Legacy Applications Representative</p>
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
