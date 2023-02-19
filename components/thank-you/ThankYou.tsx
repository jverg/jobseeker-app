import React from 'react';
import { useTranslation } from 'next-i18next';
import TickIcon from '@assets/svgs/tick-icon.svg';
import UiButton from '@components/ui/button/UiButton';
import { useRouter } from 'next/router';
import styles from './ThankYou.module.less';

const ThankYou: React.FC = () => {
  const { t: translate } = useTranslation('common');
  const router = useRouter();

  return (
    <>
      <div className={styles.wrapThankYou}>
        <TickIcon />
        <p className="roboto">{translate('thank_you.application_successful')}</p>
        <p className="roboto-bold">{router.query.title}</p>
        <UiButton onClick={() => router.push('/')} className={styles.backButton}>
          {translate('thank_you.back_to_positions')}
        </UiButton>
      </div>
    </>
  );
};

export default ThankYou;
