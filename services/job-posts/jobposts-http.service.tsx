import axiosInstance from '@utils/http-client';
import Jobs from '@models/jobs';

export default function listJobPosts(): Promise<Jobs> {
  return axiosInstance.get('/job-posts');
}
