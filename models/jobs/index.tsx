export interface JobModel {
  id: number;
  companyName: string;
  address: string;
  createdAt: number;
  validUntil: number;
  title: string;
  description: string;
}

interface Jobs {
  items: Array<JobModel>;
  totalCount: number;
  totalPages: number;
}

export default Jobs;
