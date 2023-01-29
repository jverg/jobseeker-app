import React, { useEffect, useState } from 'react';
import listJobs from '@services/job-posts/jobposts-http.service';
import JobsList from '@components/jobs-list/JosList';
import { Spin } from 'antd';
import Jobs from '@models/jobs';

const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<Jobs>();
  const fetchPositions = async () => {
    try {
      const jobsList: Jobs = await listJobs();
      setJobs(jobsList);
    } catch (requestError: any) {
      console.log('Fail');
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  return jobs ? <JobsList jobs={jobs} /> : <Spin />;
};

export default HomePage;
