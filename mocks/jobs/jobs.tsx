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

export const jobsListMock = {
  items: [
    {
      id: 0,
      companyName: 'Tech S.A',
      address: 'Po Box City',
      createdAt: 1631699485342,
      validUntil: 1631699485342,
      title: 'Web developer',
    },
    {
      id: 1,
      companyName: 'Kariera',
      address: 'Gerakas, Athens',
      createdAt: 1631699485342,
      validUntil: 1636969885342,
      title: 'Node JS developer',
    },
    {
      id: 2,
      companyName: 'Tech S.A',
      address: 'Po Box City',
      createdAt: 1631699485342,
      validUntil: 1636969885342,
      title: 'Web developer',
    },
    {
      id: 3,
      companyName: 'Tech S.A',
      address: 'Po Box City',
      createdAt: 1631699485342,
      validUntil: 1631699485342,
      title: 'Web developer',
    },
    {
      id: 4,
      companyName: 'Kariera',
      address: 'Gerakas, Athens',
      createdAt: 1631699485342,
      validUntil: 1636969885342,
      title: 'Node JS developer',
    },
    {
      id: 5,
      companyName: 'Tech S.A',
      address: 'Po Box City',
      createdAt: 1631699485342,
      validUntil: 1636969885342,
      title: 'Web developer',
    },
    {
      id: 6,
      companyName: 'Tech S.A',
      address: 'Po Box City',
      createdAt: 1631699485342,
      validUntil: 1631699485342,
      title: 'Web developer',
    },
    {
      id: 7,
      companyName: 'Kariera',
      address: 'Gerakas, Athens',
      createdAt: 1631699485342,
      validUntil: 1636969885342,
      title: 'Node JS developer',
    },
    {
      id: 8,
      companyName: 'Tech S.A',
      address: 'Po Box City',
      createdAt: 1631699485342,
      validUntil: 1636969885342,
      title: 'Web developer',
    },
    {
      id: 9,
      companyName: 'Tech S.A',
      address: 'Po Box City',
      createdAt: 1631699485342,
      validUntil: 1631699485342,
      title: 'Web developer',
    },
    {
      id: 10,
      companyName: 'Kariera',
      address: 'Gerakas, Athens',
      createdAt: 1631699485342,
      validUntil: 1636969885342,
      title: 'Node JS developer',
    },
    {
      id: 11,
      companyName: 'Tech S.A',
      address: 'Po Box City',
      createdAt: 1631699485342,
      validUntil: 1636969885342,
      title: 'Web developer',
    },
  ],
  totalCount: 100,
  totalPages: 10,
};

export const jobsSearchMock = {
  items: [
    {
      id: 0,
      companyName: 'Tech S.A',
      address: 'Po Box City',
      createdAt: 1631699485342,
      validUntil: 1631699485342,
      title: 'Web developer',
    },
  ],
  totalCount: 100,
  totalPages: 10,
};

export default jobElem;
