import React from 'react';
import UiButton from '@components/ui/button/UiButton';
import styles from './JobseekerCard.module.less';

const JobseekerCard: React.FC = () => {
  return (
    <div className={styles.wrapCard}>
      <h6 className={`h6 ${styles.companySubheader}`}>Electrol</h6>
      <h4 className={`h4 ${styles.positionTitle}`}>Legacy Brand Analyst</h4>
      <div className={styles.cardDetails}>
        <div className={styles.cardDetail}>
          <h6 className={`h6 ${styles.detailTitle}`}>Date Posted</h6>
          <p className={`main-body-text ${styles.detailInfo}`}>22 Feb</p>
        </div>
        <div className={styles.cardDetail}>
          <h6 className={`h6 ${styles.detailTitle}`}>Apply until</h6>
          <p className={`main-body-text ${styles.detailInfo}`}>4 Mar</p>
        </div>
        <div className={styles.cardDetail}>
          <h6 className={`h6 ${styles.detailTitle}`}>Location</h6>
          <p className={`main-body-text ${styles.detailInfo}`}>Russia</p>
        </div>
      </div>
      <UiButton type="primary" size="small">
        Apply now
      </UiButton>
    </div>
  );
};

export default JobseekerCard;
