import React from 'react';
import UiButton from '@components/ui/button/UiButton';
import listJobPosts from '@services/job-posts/jobposts-http.service';
import { useRouter } from 'next/router';
import { JobModel } from '@models/jobs';
import styles from './JobseekerCard.module.less';

type JobseekerCardProps = {
  job: JobModel;
};

const JobseekerCard: React.FC<JobseekerCardProps> = ({ job }) => {
  const router = useRouter();

  return (
    <div className={styles.wrapCard}>
      <h6 className={`h6 ${styles.companySubheader}`}>{job.companyName}</h6>
      <h4 className={`h4 ${styles.positionTitle}`}>{job.title}</h4>
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
          <p className={`main-body-text ${styles.detailInfo}`}>{job.address}</p>
        </div>
      </div>
      <UiButton type="primary" size="small" onClick={() => router.push(`/job/${job.id}`)}>
        Apply now
      </UiButton>
    </div>
  );
};

export default JobseekerCard;
