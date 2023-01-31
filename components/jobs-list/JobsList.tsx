import React from 'react';
import { Spin } from 'antd';
import { JobModel } from '@models/jobs';
import JobCard from '@components/jobs-list/job-card/JobCard';
import styles from './JobsList.module.less';

type JobsListProps = {
  jobs: Array<JobModel>;
};

const JobsList: React.FC<JobsListProps> = ({ jobs }) => {
  return (
    <div className={styles.wrapJobsList}>
      <div className={styles.jobsList}>
        {jobs ? (
          jobs.map((job: JobModel) => {
            return <JobCard key={job.id} job={job} action />;
          })
        ) : (
          <Spin />
        )}
      </div>
    </div>
  );
};

export default JobsList;
