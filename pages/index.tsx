import React, { useEffect, useState } from 'react';
import JobseekerCard from '@components/jobseeker-card/JobseekerCard';
import listJobPosts from '@services/job-posts/jobposts-http.service';
import Jobs, { Job } from '@models/jobs';

const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<Jobs>();
  const fetchPositions = async () => {
    try {
      const jobsList: Jobs = await listJobPosts();
      setJobs(jobsList);
    } catch (requestError: any) {
      console.log('Fail');
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {jobs
        ? jobs.items.map((job: Job) => {
            return <JobseekerCard key={job.id} job={job} />;
          })
        : ''}
    </div>
  );
};

export default HomePage;
