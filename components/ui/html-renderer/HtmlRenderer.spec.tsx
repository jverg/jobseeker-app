import React from 'react';
import HtmlRenderer from '@components/ui/html-renderer/HtmlRenderer';
import { cleanup, render, screen } from '@testing-library/react';

describe('HtmlRenderer', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render a basic paragraph given as html', () => {
    render(<HtmlRenderer html="<p>Test paragraph</p>" testId="test" />);
    expect(screen.getByTestId('html-renderer-test')).toBeVisible();
    expect(screen.getByText('Test paragraph')).toBeVisible();
    expect(screen.getByTestId('html-renderer-test')).toHaveTextContent('Test paragraph');
  });
  it('should render a more complex html and escape dangerous tags', () => {
    const complexHtml = `
      <h2>This is the heading h2</h2>
      <h3>This is heading h3</h3>
      <p>Bla bla bla <a href="https://www.google.com" target="_blank" rel="noopener">google</a> bla bla bla <strong>blablabla </strong>bla <em>blabla </em><span style="text-decoration: underline;">bla</span></p>
      <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      </ul>
      <p>Bla bla bla</p>
      <p><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Im…obile_phone.png/1200px-Image_created_with_a_mobile_phone.png" alt="" width="257" height="193" /> <img src="https://employerfiles.blob.core.windows.net/useruploads/1005/branded-company/images/2d79deeba1e03.jpg" alt="" width="290" height="192" /></p>
      <p><iframe style="width: 547px; height: 222px;" title="YouTube video player" src="https://www.youtube.com/embed/womsDCDcEEM" width="547" height="222" frameborder="0" allowfullscreen="allowfullscreen"></iframe></p>
      <script>alert('hello')</script>
    `;

    const { container } = render(<HtmlRenderer html={complexHtml} testId="test" />);
    expect(container).toMatchSnapshot();
  });
});
