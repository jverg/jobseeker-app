import React, { useEffect, useState } from 'react';
import { JobModel } from '@models/jobs';
import { Form, InputNumber, Spin } from 'antd';
import JobCard from '@components/jobs-list/job-card/JobCard';
import { getJob, postToJob } from '@services/jobs/jobs-http.service';
import useNotification from '@hooks/notification/useNotification';
import StateEnum from '@constants/state.enum';
import UiButton from '@components/ui/button/UiButton';
import HtmlRenderer from '@components/ui/html-renderer/HtmlRenderer';
import styles from './JobModal.module.less';

type JobModalProps = {
  jobId: number;
};

const JobModal: React.FC<JobModalProps> = ({ jobId }) => {
  const [form] = Form.useForm();
  const [job, setJob] = useState<JobModel>();
  const [disabled, setDisabled] = useState<boolean>(true);

  const [generalError] = useNotification(
    StateEnum.ERROR,
    'Something went wrong',
    'Oops, something went wrong, please try again later!',
  );

  const fetchJob = async () => {
    try {
      const jobElem: JobModel = await getJob(jobId.toString());
      setJob(jobElem);
    } catch (requestError: any) {
      if (requestError.response.statusText !== 'Unauthorized') generalError();
    }
  };

  useEffect(() => {
    fetchJob();
  }, [jobId]);

  const applyToJob = async () => {
    try {
      await postToJob(jobId, form.getFieldValue('yearsOfExperience'));
      window.location.assign('/thank-you');
    } catch (requestError: any) {
      if (requestError.response.statusText !== 'Unauthorized') generalError();
    }
  };

  const ApplyToJobForm = () => {
    return (
      <Form name="jobApply" layout="vertical" autoComplete="off" form={form}>
        <Form.Item
          label="How many years of experience?"
          name="yearsOfExperience"
          rules={[{ required: true, message: 'Please input your years of experience' }]}
        >
          <InputNumber onChange={(value) => setDisabled(!value)} />
        </Form.Item>
      </Form>
    );
  };

  return (
    <>
      {job ? (
        <div>
          <div className={styles.stickyHeaderCard}>
            <JobCard job={job} action={false} />
          </div>
          <div className={styles.wrapJobDescription}>
            <HtmlRenderer html={job.description} className={styles.jobDescription} />
            <ApplyToJobForm />
          </div>
          <div className={styles.wrapSendApplicationButton}>
            <UiButton
              htmlType="submit"
              type="primary"
              size="small"
              onClick={applyToJob}
              className={styles.sendApplication}
              disabled={disabled}
            >
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
