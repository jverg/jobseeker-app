import React, { useState } from 'react';
import { Modal } from 'antd';
import UiButton from '@components/ui/button/UiButton';
import JobModal from '@components/jobs-list/job-modal/JobModal';
import { JobModel } from '@models/jobs';
import styles from './JobCard.module.less';

type JobCardProps = {
  job: JobModel;
  action: boolean;
};

const JobCard: React.FC<JobCardProps> = ({ job, action }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.wrapCard}>
      <h6 className={`h6 ${styles.companySubheader}`}>{job.companyName}</h6>
      <h4 className={`h4 ${styles.positionTitle}`}>{job.title}</h4>
      <div className={styles.cardDetails}>
        <div className={styles.cardDetail}>
          <h6 className={`h6 ${styles.detailTitle}`}>Date Posted</h6>
          <p className={`main-body-text ${styles.detailInfo}`}>22 Feb</p>
        </div>
        <div className={styles.cardDetail}>
          <h6 className={`h6 ${styles.detailTitle}`}>Apply until</h6>
          <p className={`main-body-text ${styles.detailInfo}`}>4 Mar</p>
        </div>
        <div className={styles.cardDetail}>
          <h6 className={`h6 ${styles.detailTitle}`}>Location</h6>
          <p className={`main-body-text ${styles.detailInfo}`}>{job.address}</p>
        </div>
      </div>
      {action && (
        <UiButton type="primary" size="small" onClick={showModal}>
          Apply now
        </UiButton>
      )}
      <Modal
        title={<div className={`h6 ${styles.modalTitle}`}>Apply for the Job</div>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <JobModal jobId={job.id} />
      </Modal>
    </div>
  );
};

export default JobCard;
