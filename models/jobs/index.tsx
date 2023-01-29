export interface Job {
  id: number;
  companyName: string;
  address: string;
  createdAt: number;
  validUntil: number;
  title: string;
}

interface Jobs {
  items: Array<Job>;
  totalCount: number;
  totalPages: number;
}

export default Jobs;
