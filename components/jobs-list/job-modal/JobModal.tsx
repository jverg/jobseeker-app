import React, { useEffect, useState } from 'react';
import { JobModel } from '@models/jobs';
import { Spin } from 'antd';
import JobCard from '@components/jobs-list/job-card/JobCard';
import { getJob } from '@services/jobs/jobs-http.service';
import HtmlRenderer from '@components/ui/html-renderer/HtmlRenderer';
import styles from './JobModal.module.less';
import UiButton from "@components/ui/button/UiButton";

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
    <>
      {job ? (
        <div>
          <div className={styles.stickyHeaderCard}>
            <JobCard job={job} action={false} />
          </div>
          <div className={styles.wrapJobDescription}>
            <HtmlRenderer html={job.description} />
          </div>
          <div className={styles.wrapSendApplicationButton}>
            <UiButton type="primary" size="small" onClick={() => {}} className={styles.sendApplication}>
              Send application
            </UiButton>
          </div>
        </div>
      ) : (
        <Spin />
      )}
    </>
  );
};

export default JobModal;
