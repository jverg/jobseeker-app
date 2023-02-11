import { JobModel } from '@models/jobs';

const jobElem: JobModel = {
  id: 1,
  companyName: 'Test Company',
  address: 'test address',
  createdAt: 1631699485342,
  validUntil: 1631699485342,
  title: 'Test job title',
  description: 'This is a test job description',
};

export const jobElemWithFutureDate = {
  id: 1,
  companyName: 'Test Company',
  address: 'test address',
  createdAt: 3045699485342,
  validUntil: 3045699485342,
  title: 'Test job title',
  description: 'This is a test job description',
};

export default jobElem;
