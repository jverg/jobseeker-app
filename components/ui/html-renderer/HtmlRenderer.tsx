import React from 'react';
import sanitizeHtml from 'sanitize-html';
import styles from './HtmlRenderer.module.less';

type HtmlRendererType = {
  html: string;
  className?: string;
  testId?: string;
};

const HtmlRenderer: React.FC<HtmlRendererType> = ({ html, className = '', testId }) => {
  /**
   * In order to make the iframes (videos) responsive
   * we have to add a class on the parent (p tag) element
   * to target it through css
   */
  const addClassToIframeParent = html.replace(/<p><iframe/g, '<p class="iframe-container"><iframe loading="lazy"');

  /**
   * Html sanitization
   * All default tags are allowed, adding
   * - <iframe> for video embeds
   * - <img> for images
   * - <a> for links
   * The allowed hostnames for iframes are youtube and vimeo
   */
  const sanitizedHtml = sanitizeHtml(addClassToIframeParent, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['iframe', 'img']),
    allowedAttributes: {
      iframe: ['src', 'width', 'height', 'allowfullscreen', 'loading'],
      p: ['class'],
      img: ['src', 'alt', 'width', 'height'],
      a: ['href', 'target'],
    },
    allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
  });

  return (
    <div
      className={`${styles.renderer} ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      data-testid={`html-renderer-${testId}`}
    />
  );
};

HtmlRenderer.defaultProps = {
  className: undefined,
  testId: undefined,
};

export default HtmlRenderer;
