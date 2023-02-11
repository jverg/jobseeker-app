import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import jobElem from '@mocks/jobs/jobs';
import JobCard from './JobCard';

describe('Job card component', () => {
  afterAll(() => {
    cleanup();
  });
  it('should render the job card component', () => {
    render(<JobCard job={jobElem} action={false} />);
    expect(screen.queryAllByText('Test job title')[0]).toBeInTheDocument();
  });
  it('should render the job card component with the action button', () => {
    render(<JobCard job={jobElem} action />);
    expect(screen.queryAllByText('Test job title')[0]).toBeInTheDocument();
    expect(screen.getByText('job_card.apply_now')).toBeInTheDocument();
  });
  it('should open the job modal', () => {
    render(<JobCard job={jobElem} action />);
    expect(screen.queryAllByText('Test job title')[0]).toBeInTheDocument();
    expect(screen.getByText('job_card.apply_now')).toBeInTheDocument();
    fireEvent.click(screen.getByText('job_card.apply_now'));
    expect(screen.getByText('Apply for the Job')).toBeInTheDocument();
  });
});
