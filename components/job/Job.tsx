import React from 'react';
import { JobModel } from '@models/jobs';
import styles from './Job.module.less';

type JobsListProps = {
  job: JobModel;
};

const Job: React.FC<JobsListProps> = ({ job }) => {
  return (
    <div className={styles.wrapJobsList}>
      <div className={styles.jobsList}>
        <div>{job.title}</div>
      </div>
    </div>
  );
};

export default Job;
