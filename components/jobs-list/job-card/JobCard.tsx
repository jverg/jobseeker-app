import React, { useState } from 'react';
import { Image, Modal } from 'antd';
import dayMonthFormat from '@constants/date-format';
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

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const CardDetailsComponent = () => {
    return (
      <div className={styles.cardDetails}>
        <div className={styles.cardDetail}>
          <h6 className={`h6 ${styles.detailTitle}`}>Date Posted</h6>
          <p className={`main-body-text ${styles.detailInfo}`}>{dayMonthFormat(job.createdAt)}</p>
        </div>
        <div className={styles.cardDetail}>
          <h6 className={`h6 ${styles.detailTitle}`}>Apply until</h6>
          <p className={`main-body-text ${styles.detailInfo}`}>{dayMonthFormat(job.validUntil)}</p>
        </div>
        <div className={styles.cardDetail}>
          <h6 className={`h6 ${styles.detailTitle}`}>Location</h6>
          <p className={`main-body-text ${styles.detailInfo}`}>{job.address}</p>
        </div>
      </div>
    );
  };

  const MobileCardHeader = () => {
    return (
      <div className={styles.jobInfoMobile}>
        <div className={styles.mobileJobHeader}>
          <div className={styles.wrapCompanyLogo}>
            <Image
              preview={false}
              className={styles.companyLogo}
              src={`/assets/svgs/companies/${job.companyName.replace(/\s/g, '').toLowerCase()}.svg`}
              alt={`${job.companyName} logo`}
            />
          </div>
          <div className={styles.jobCompanyTitles}>
            <h6 className={`h6 ${styles.companySubheader}`}>{job.companyName}</h6>
            <h4 className={`h4 ${styles.positionTitle}`}>{job.title}</h4>
          </div>
        </div>
        <CardDetailsComponent />
      </div>
    );
  };

  const DesktopCardHeader = () => {
    return (
      <div className={styles.jobInfoDesktop}>
        <div className={styles.wrapCompanyLogo}>
          <Image
            preview={false}
            className={styles.companyLogo}
            src={`/assets/svgs/companies/${job.companyName.replace(/\s/g, '').toLowerCase()}.svg`}
            alt={`${job.companyName} logo`}
          />
        </div>
        <div className={styles.wrapDesktopheader}>
          <h6 className={`h6 ${styles.companySubheader}`}>{job.companyName}</h6>
          <h4 className={`h4 ${styles.positionTitle}`}>{job.title}</h4>
          <CardDetailsComponent />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.wrapCard}>
      <MobileCardHeader />
      <DesktopCardHeader />
      {action && (
        <UiButton type="primary" size="small" onClick={showModal} className={styles.applyButton}>
          Apply now
        </UiButton>
      )}
      <Modal
        title={<div className={`h5 ${styles.modalTitle}`}>Apply for the Job</div>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <JobModal jobId={job.id} />
      </Modal>
    </div>
  );
};

export default JobCard;
