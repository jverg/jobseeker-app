import React, { useEffect, useState } from 'react';
import listJobs from '@services/jobs/jobs-http.service';
import JobsList from '@components/jobs-list/JobsList';
import { Spin } from 'antd';
import Jobs, { JobModel } from '@models/jobs';
import styles from './index.module.less';

const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<Array<JobModel>>();

  const fetchJobs = async () => {
    try {
      const jobsList: Jobs = await listJobs();
      setJobs(jobsList.items);
    } catch (requestError: any) {
      console.log('Fail');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return jobs ? (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <JobsList jobs={jobs} />
      <div className={`h6 ${styles.loadingMore}`}>loading more jobs</div>
    </div>
  ) : (
    <Spin />
  );
};

export default HomePage;
