import React from 'react';
import { cleanup, render, waitFor, screen, fireEvent } from '@testing-library/react';
import jobElem, { jobElemWithFutureDate } from '@mocks/jobs/jobs';
import axiosInstance from '@utils/http-client';
import JobModal from './JobModal';

jest.mock('dayjs/locale/el', () => {});
jest.mock('dayjs', () => {
  const mockDayjs = jest.fn(() => ({
    format: jest.fn(),
    locale: jest.fn(() => ({
      format: jest.fn(),
    })),
  }));
  return mockDayjs;
});

describe('Job modal component', () => {
  afterAll(() => {
    cleanup();
  });
  it('should render the job modal component', async () => {
    const axiosJobGet = jest.spyOn(axiosInstance, 'get');

    render(<JobModal jobId={jobElem.id} />);
    await waitFor(() => expect(axiosJobGet).toHaveBeenCalledWith(`/job-posts/${jobElem.id}`));
  });
  it('should render the not accepted more applications button', async () => {
    jest.spyOn(axiosInstance, 'get').mockImplementation(() => Promise.resolve(jobElem));
    render(<JobModal jobId={jobElem.id} />);
    await waitFor(() => expect(screen.getByText('job_modal.not_accept_applications')).toBeInTheDocument());
  });
  it('should render the send application button', async () => {
    jest.spyOn(axiosInstance, 'get').mockImplementation(() => Promise.resolve(jobElemWithFutureDate));

    render(<JobModal jobId={jobElemWithFutureDate.id} />);
    await waitFor(() => expect(screen.getByText('job_modal.send_application')).toBeInTheDocument());
  });
  it('should send application', async () => {
    jest.spyOn(axiosInstance, 'get').mockImplementation(() => Promise.resolve(jobElemWithFutureDate));
    const axiosJobPost = jest.spyOn(axiosInstance, 'post').mockImplementation();

    render(<JobModal jobId={jobElemWithFutureDate.id} />);
    await waitFor(() => expect(screen.getByText('job_modal.send_application')).toBeInTheDocument());
    fireEvent.change(screen.getByTestId('years-of-experience-input'), {
      target: { value: 7 },
    });
    fireEvent.click(screen.getByText('job_modal.send_application'));
    await waitFor(() => expect(axiosJobPost).toHaveBeenCalledWith(`/job-posts/apply`, { id: 1, yearsOfExperience: 7 }));
  });
  it('should render the error message if years of experience is empty', async () => {
    jest.spyOn(axiosInstance, 'get').mockImplementation(() => Promise.resolve(jobElemWithFutureDate));
    render(<JobModal jobId={jobElemWithFutureDate.id} />);
    await waitFor(() => expect(screen.getByText('job_modal.give_your_experience')).toBeInTheDocument());
    fireEvent.change(screen.getByTestId('years-of-experience-input'), {
      target: { value: 7 },
    });
    await waitFor(() => expect(screen.getByText('job_modal.send_application')).toBeEnabled());
    await waitFor(() => expect(screen.queryByText('job_modal.give_your_experience')).not.toBeInTheDocument());
  });
});
