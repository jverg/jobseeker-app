import React from 'react';
import Jobs, { Job } from '@models/jobs';
import JobseekerCard from '@components/jobs-list/jobseeker-card/JobseekerCard';
import styles from './JobsList.module.less';

type JobsListProps = {
  jobs: Jobs;
};

const JobsList: React.FC<JobsListProps> = ({ jobs }) => {
  return (
    <div className={styles.wrapJobsList}>
      <div className={styles.jobsList}>
        {jobs
          ? jobs.items.map((job: Job) => {
              return <JobseekerCard key={job.id} job={job} />;
            })
          : ''}
      </div>
    </div>
  );
};

export default JobsList;
