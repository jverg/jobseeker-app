import React, { useEffect, useState } from 'react';
import { Form, Input, Spin } from 'antd';
import Jobs, { JobModel } from '@models/jobs';
import User from '@models/user';
import JobCard from '@components/jobs-list/job-card/JobCard';
import listJobs from '@services/jobs/jobs-http.service';
import DotIcon from '@assets/svgs/dot-icon.svg';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'next-i18next';
import useNotification from '@hooks/notification/useNotification';
import StateEnum from '@constants/state.enum';
import styles from './JobsList.module.less';

const JobsList: React.FC = () => {
  const { t: translate } = useTranslation('common');
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(1);
  const [queryParam, setQueryParam] = useState<string>('');
  const [user, setUser] = useState<User>();
  const [jobs, setJobs] = useState<Array<JobModel>>();

  const [generalError] = useNotification(
    StateEnum.ERROR,
    'Something went wrong',
    'Oops, something went wrong, please try again later!',
  );

  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  const fetchJobs = async (pageNum: number) => {
    if (page <= totalPages) {
      try {
        const jobsList: Jobs = await listJobs(pageNum, queryParam);
        setTotalJobs(jobsList.totalCount);
        if (jobs) {
          setJobs([...jobs, ...jobsList.items]);
        } else {
          setJobs(jobsList.items);
        }
        setTotalPages(jobsList.totalPages);
      } catch (requestError: any) {
        if (requestError.response.statusText !== 'Unauthorized') generalError();
      }
    }
  };

  const handleScroll = () => {
    if (inView) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [inView]);

  useEffect(() => {
    fetchJobs(1);
    const userElem: string = localStorage.getItem('user')!;
    setUser(JSON.parse(userElem));
  }, []);

  useEffect(() => {
    if (page !== 1) {
      fetchJobs(page);
    }
  }, [page]);

  const onFinish = async (searchValue: string) => {
    try {
      await setPage(1);
      await setJobs([]);
      await setTotalJobs(1);
      await setQueryParam(searchValue);
      const jobsList: Jobs = await listJobs(1, searchValue);
      await setJobs(jobsList.items);
      await setTotalJobs(jobsList.totalCount);
      await setTotalPages(jobsList.totalPages);
    } catch (requestError: any) {
      if (requestError.response.statusText !== 'Unauthorized') generalError();
    }
  };

  return (
    <div className={styles.wrapJobsList}>
      <div className={styles.wrapUserIntro}>
        <div className={styles.userIntro}>
          <div>{translate('jobs_list.hello')}</div>
          <div>{user?.email}</div>
        </div>
      </div>
      <div style={{ width: '100%' }}>
        <Form name="searchJobs" form={form} onFinish={(values) => onFinish(values.search)} layout="vertical">
          <Form.Item name="search" label={translate('jobs_list.search_for_job')} className="main-body-text">
            <Input placeholder="Enter keyword" />
          </Form.Item>
        </Form>
        {jobs && (
          <div className={`h4 ${styles.jobsMessage}`}>
            {translate('jobs_list.showing_message', { jobsLength: jobs.length, totalJobs })}
          </div>
        )}
      </div>
      <div className={styles.jobsList}>
        {jobs ? (
          jobs.map((job: JobModel) => {
            return <JobCard key={job.id} job={job} action />;
          })
        ) : (
          <Spin />
        )}
      </div>
      {page <= totalPages && (
        <div ref={ref} className={`h6 ${styles.loadingMore}`}>
          <div className={styles.dots}>
            <div className={styles.dot1}>
              <DotIcon />
            </div>
            <div className={styles.dot2}>
              <DotIcon />
            </div>
            <div className={styles.dot3}>
              <DotIcon />
            </div>
          </div>
          <div className={styles.loadingText}>{translate('jobs_list.jobs_loading')}</div>
        </div>
      )}
    </div>
  );
};

export default JobsList;
