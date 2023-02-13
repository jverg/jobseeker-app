import React from 'react';
import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import axiosInstance from '@utils/http-client';
import Login from './Login';

describe('Login component', () => {
  afterAll(() => {
    cleanup();
  });
  it('should render the login component', () => {
    render(<Login />);
    expect(screen.getByText('login.enter_your_email')).toBeInTheDocument();
  });
  it('should login a user', async () => {
    const axiosLoginPost = jest.spyOn(axiosInstance, 'post');
    render(<Login />);
    const emailInput: HTMLElement = screen.getByTestId('email-input');
    fireEvent.change(emailInput, {
      target: { value: 'email@email.com' },
    });
    const passwordInput: HTMLElement = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, {
      target: { value: 'test@123!' },
    });
    fireEvent.click(screen.getByText('login.login'));
    await waitFor(() =>
      expect(axiosLoginPost).toHaveBeenCalledWith('/login', {
        email: 'email@email.com',
        password: 'test@123!',
      }),
    );
  });
  it('should login of invalid user', async () => {
    const axiosLoginPost = jest
      .spyOn(axiosInstance, 'post')
      .mockImplementation(() => Promise.resolve({ code: 401, message: 'Incorrect email or password' }));
    render(<Login />);
    const emailInput: HTMLElement = screen.getByTestId('email-input');
    fireEvent.change(emailInput, {
      target: { value: 'email@email.com' },
    });
    const passwordInput: HTMLElement = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, {
      target: { value: 'test@123!' },
    });
    fireEvent.click(screen.getByText('login.login'));
    await waitFor(() =>
      expect(axiosLoginPost).toHaveBeenCalledWith('/login', {
        email: 'email@email.com',
        password: 'test@123!',
      }),
    );
    await waitFor(() =>
      expect(screen.queryAllByText('notifications.wrong_credentials_try_again')[0]).toBeInTheDocument(),
    );
  });
});
