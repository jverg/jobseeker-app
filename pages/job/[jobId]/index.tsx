import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { JobModel } from '@models/jobs';
import { getJob } from '@services/job-posts/jobposts-http.service';
import Job from '@components/job/Job';

const JobPage: NextPage = () => {
  const [job, setJob] = useState<JobModel>();
  const router = useRouter();
  const fetchJob = async () => {
    try {
      const jobElement: JobModel = await getJob(router.query.jobId as string);
      setJob(jobElement);
    } catch (e: any) {
      console.log('Fail');
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  return job ? <Job job={job} /> : <Spin />;
};

export default JobPage;
