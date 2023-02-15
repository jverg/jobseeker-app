import React from 'react';
import { useTranslation } from 'next-i18next';
import TickIcon from '@assets/svgs/tick-icon.svg';
import { useRouter } from 'next/router';
import styles from './ThankYou.module.less';

const ThankYou: React.FC = () => {
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

export default ThankYou;
