import React, { useEffect, useState } from 'react';
import { JobModel } from '@models/jobs';
import { Spin } from 'antd';
import JobCard from '@components/jobs-list/job-card/JobCard';
import { getJob } from '@services/job-posts/jobposts-http.service';
import HtmlRenderer from '@components/ui/html-renderer/HtmlRenderer';
import styles from './JobModal.module.less';

type JobModalProps = {
  jobId: number;
};
const JobModal: React.FC<JobModalProps> = ({ jobId }) => {
  const [job, setJob] = useState<JobModel>();
  const fetchJob = async () => {
    try {
      const jobElem: JobModel = await getJob(jobId.toString());
      setJob(jobElem);
    } catch (requestError: any) {
      console.log('Fail');
    }
  };

  useEffect(() => {
    fetchJob();
  }, [jobId]);

  return (
    <div className={styles.wrapJobsList}>
      {job ? (
        <div className={styles.jobsList}>
          <JobCard job={job} action={false} />
          <HtmlRenderer html={job.description} />
        </div>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default JobModal;
