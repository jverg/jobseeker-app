import axiosInstance from '@utils/http-client';
import Jobs, { JobModel } from '@models/jobs';

export default function listJobs(): Promise<Jobs> {
  return axiosInstance.get('/job-posts');
}

export function getJob(jobId: string): Promise<JobModel> {
  return axiosInstance.get(`/job-posts/${jobId}`);
}
