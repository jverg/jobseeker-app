import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import AppLayout from './AppLayout';

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

describe('App layout component', () => {
  afterAll(() => {
    cleanup();
  });
  it('should render the app layout component', () => {
    render(
      <AppLayout>
        <div>Rendered children</div>
      </AppLayout>,
    );
    expect(screen.getByTestId('globe-icon-test')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('globe-icon-test'));
    expect(screen.getByText('layout.greek')).toBeInTheDocument();
    expect(screen.getByText('layout.english')).toBeInTheDocument();
  });
  it('should render the children of app layout', () => {
    render(
      <AppLayout>
        <div>Rendered children</div>
      </AppLayout>,
    );
    expect(screen.getByText('Rendered children')).toBeInTheDocument();
  });
});
