import axiosInstance from '@utils/http-client';
import Jobs, { JobModel } from '@models/jobs';

type ResponseType = {
  code: number;
  message: string;
};

export function getJob(jobId: string): Promise<JobModel> {
  return axiosInstance.get(`/job-posts/${jobId}`);
}

export function postToJob(id: number, yearsOfExperience: number): Promise<ResponseType> {
  return axiosInstance.post(`/job-posts/apply`, { id, yearsOfExperience });
}

export default function listJobs(page?: number, queryParam: string = ''): Promise<Jobs> {
  return axiosInstance.get(`/job-posts?q=${queryParam}`, { params: { page } });
}
