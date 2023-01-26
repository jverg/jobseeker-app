import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import UiButton from './UiButton';

describe('UiButton', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render the button', () => {
    render(<UiButton>test</UiButton>);

    expect(screen.getByText('test')).toBeInTheDocument();
  });
  it('should render a given className', () => {
    const { container } = render(<UiButton className="test-class" />);

    expect(container.querySelector('.test-class')).toBeInTheDocument();
  });
  it('should call the given onClick', () => {
    const testOnClick = jest.fn();

    render(<UiButton onClick={testOnClick}>test</UiButton>);
    fireEvent.click(screen.getByText('test'));
    expect(testOnClick).toHaveBeenCalled();
  });
  it('should check default UiButton without any params', () => {
    render(<UiButton>test</UiButton>);
    fireEvent.click(screen.getByText('test'));
  });
});
