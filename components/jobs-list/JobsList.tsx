import React, { useEffect, useState } from 'react';
import { Form, Image, Input, Spin } from 'antd';
import Jobs, { JobModel } from '@models/jobs';
import JobCard from '@components/jobs-list/job-card/JobCard';
import listJobs from '@services/jobs/jobs-http.service';
import { useInView } from 'react-intersection-observer';
import styles from './JobsList.module.less';

const JobsList: React.FC = () => {
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(1);
  const [queryParam, setQueryParam] = useState<string>('');
  const [jobs, setJobs] = useState<Array<JobModel>>();

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
        console.log('Fail');
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
    fetchJobs(page);
  }, [page]);

  const onFinish = async (searchValue: string) => {
    setPage(1);
    setJobs([]);
    setTotalJobs(1);
    setQueryParam(searchValue);
    try {
      const jobsList: Jobs = await listJobs(1, searchValue);
      setJobs(jobsList.items);
      setTotalJobs(jobsList.totalCount);
      setTotalPages(jobsList.totalPages);
    } catch (requestError: any) {
      console.log('Fail');
    }
  };

  return (
    <div className={styles.wrapJobsList}>
      <div style={{ width: '100%' }}>
        <Form name="searchJobs" form={form} onFinish={(values) => onFinish(values.search)} layout="vertical">
          <Form.Item name="search" label="Search for a job" className="main-body-text">
            <Input placeholder="Enter keyword" />
          </Form.Item>
        </Form>
        {jobs && (
          <div className={`h4 ${styles.jobsMessage}`}>{`Showing ${jobs.length} of ${totalJobs} job posts`}</div>
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
          <Image preview={false} src="/assets/svgs/loading-dot-icon.svg" alt="Loading dots" />
          <div className={styles.loadingText}>loading more jobs</div>
        </div>
      )}
    </div>
  );
};

export default JobsList;
