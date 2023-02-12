import React from 'react';
import { cleanup, render, waitFor, screen } from '@testing-library/react';
import jobElem, { jobElemWithFutureDate } from '@mocks/jobs/jobs';
import axiosInstance from '@utils/http-client';
import JobModal from './JobModal';

describe('Job modal component', () => {
  afterAll(() => {
    cleanup();
  });
  it('should render the job modal component', async () => {
    const error = { response: { statusText: 'Not Found' } };
    jest.spyOn(axiosInstance, 'get').mockImplementation(() => Promise.reject(error));
    const axiosJobGet = jest.spyOn(axiosInstance, 'get');

    render(<JobModal jobId={jobElem.id} />);
    await waitFor(() => expect(axiosJobGet).toHaveBeenCalledWith(`/job-posts/${jobElem.id}`));
  });
  it('should render the not accepted more applications button', async () => {
    const error = { response: { statusText: 'Not Found' } };
    jest.spyOn(axiosInstance, 'get').mockImplementation(() => Promise.reject(error));
    jest.spyOn(axiosInstance, 'get').mockImplementation(() => Promise.resolve(jobElem));
    render(<JobModal jobId={jobElem.id} />);
    await waitFor(() => expect(screen.getByText('job_modal.not_accept_applications')).toBeInTheDocument());
  });
  it('should render the send application button', async () => {
    const error = { response: { statusText: 'Not Found' } };
    jest.spyOn(axiosInstance, 'get').mockImplementation(() => Promise.reject(error));
    jest.spyOn(axiosInstance, 'get').mockImplementation(() => Promise.resolve(jobElemWithFutureDate));

    render(<JobModal jobId={jobElem.id} />);
    await waitFor(() => expect(screen.getByText('job_modal.send_application')).toBeInTheDocument());
  });
});
