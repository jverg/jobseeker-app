import React from 'react';
import JobsList from '@components/jobs-list/JobsList';
import styles from './index.module.less';

const HomePage: React.FC = () => {
  return (
    <div className={styles.wrapHomePage}>
      <JobsList />
    </div>
  );
};

export default HomePage;
