import React from 'react';
import TickIcon from '@assets/svgs/tick-icon.svg';
import styles from './index.module.less';

const HomePage: React.FC = () => {
  return (
    <div className={styles.wrapThankYou}>
      <TickIcon />
      <p className="h3">Application successful</p>
      <p className="h3">Legacy Applications Representative</p>
    </div>
  );
};

export default HomePage;
