import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import ThankYou from './ThankYou';

const pushRouter = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: pushRouter,
    };
  },
}));

describe('Thank you component', () => {
  afterAll(() => {
    cleanup();
  });
  it('should render the thank you component', () => {
    render(<ThankYou />);
    expect(screen.getByText('thank_you.application_successful')).toBeInTheDocument();
  });
  it('should check the go back  to positions button', async () => {
    render(<ThankYou />);
    expect(screen.getByText('thank_you.back_to_positions')).toBeInTheDocument();
    fireEvent.click(screen.getByText('thank_you.back_to_positions'));
    await waitFor(() => expect(pushRouter).toHaveBeenCalledWith('/'));
  });
});
