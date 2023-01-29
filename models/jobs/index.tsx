export interface JobModel {
  id: number;
  companyName: string;
  address: string;
  createdAt: number;
  validUntil: number;
  title: string;
}

interface Jobs {
  items: Array<JobModel>;
  totalCount: number;
  totalPages: number;
}

export default Jobs;
