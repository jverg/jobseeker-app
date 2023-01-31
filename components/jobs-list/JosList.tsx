import React from 'react';
import Jobs, { JobModel } from '@models/jobs';
import JobCard from '@components/jobs-list/job-card/JobCard';
import styles from './JobsList.module.less';

type JobsListProps = {
  jobs: Jobs;
};

const JobsList: React.FC<JobsListProps> = ({ jobs }) => {
  return (
    <div className={styles.wrapJobsList}>
      <div className={styles.jobsList}>
        {jobs
          ? jobs.items.map((job: JobModel) => {
              return <JobCard key={job.id} job={job} action />;
            })
          : ''}
      </div>
    </div>
  );
};

export default JobsList;
