import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Login from './Login';

describe('Login component', () => {
  afterAll(() => {
    cleanup();
  });
  it('should render the  login component', () => {
    render(<Login />);
    expect(screen.getByText('Enter your email')).toBeInTheDocument();
  });
});
