import React from 'react';
import { cleanup, render, waitFor, screen, fireEvent } from '@testing-library/react';
import axiosInstance from '@utils/http-client';
import userEvent from '@testing-library/user-event';
import { jobsListMock, jobsSearchMock } from '@mocks/jobs/jobs';
import JobsList from './JobsList';

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
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe('Jobs list component', () => {
  afterAll(() => {
    cleanup();
  });
  it('should render the jobs list component', async () => {
    const axiosJobGet = jest.spyOn(axiosInstance, 'get').mockImplementation(() => Promise.resolve(jobsListMock));

    render(<JobsList />);
    await waitFor(() => expect(axiosJobGet).toHaveBeenCalledWith('/job-posts?q=', { params: { page: 1 } }));
  });
  it('should search in jobs list component', async () => {
    const axiosJobGet = jest.spyOn(axiosInstance, 'get').mockImplementation(() => Promise.resolve(jobsListMock));
    const axiosSearchJobsGet = jest
      .spyOn(axiosInstance, 'get')
      .mockImplementation(() => Promise.resolve(jobsSearchMock));
    render(<JobsList />);
    await waitFor(() => expect(axiosJobGet).toHaveBeenCalledWith('/job-posts?q=', { params: { page: 1 } }));
    const searchInput: HTMLElement = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, {
      target: { value: 'Tech' },
    });
    userEvent.type(searchInput, '{enter}');
    await waitFor(() => expect(axiosSearchJobsGet).toHaveBeenCalledWith('/job-posts?q=Tech', { params: { page: 1 } }));
  });
});
