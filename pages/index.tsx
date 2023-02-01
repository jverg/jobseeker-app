import React, { useEffect, useState } from 'react';
import listJobs from '@services/jobs/jobs-http.service';
import JobsList from '@components/jobs-list/JobsList';
import { Image, Spin } from 'antd';
import Jobs, { JobModel } from '@models/jobs';
import { useInView } from 'react-intersection-observer';
import styles from './index.module.less';

const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [jobs, setJobs] = useState<Array<JobModel>>();

  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const fetchJobs = async (pageNum: number) => {
    if (page === 1 || page <= totalPages) {
      try {
        const jobsList: Jobs = await listJobs(pageNum);
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
  });

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  return jobs ? (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <JobsList jobs={jobs} />
      {page < totalPages && (
        <div ref={ref} className={`h6 ${styles.loadingMore}`}>
          <Image preview={false} src="/assets/svgs/loading-dot-icon.svg" alt="Loading dots" />
          <div className={styles.loadingText}>loading more jobs</div>
        </div>
      )}
    </div>
  ) : (
    <Spin />
  );
};

export default HomePage;
