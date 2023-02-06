// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom/extend-expect';
import React, { ReactElement } from 'react';
import UrlObject from 'url';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  function (callback) {
    setTimeout(callback, 0);
  };

declare global {
  interface Window {
    grecaptcha: any;
    gtag: any;
  }
}

window.gtag = jest.fn();

window.grecaptcha = window.grecaptcha || {
  ready: jest.fn((cb) => cb()),
  execute: jest.fn().mockResolvedValue('recaptcha-token'),
};

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    FE_APP_URL: '',
    BACKEND_URL: '',
  },
}));

// This is needed to fix a problem with Link of nextjs in testing.
// See more here: https://github.com/vercel/next.js/issues/16864
jest.mock('next/link', () => {
  type Url = string | typeof UrlObject;
  type LinkProps = {
    href: Url;
    as?: Url;
  };

  return ({ children, href }: React.PropsWithChildren<LinkProps>) =>
    React.cloneElement(React.Children.only(children as ReactElement), { href });
});
