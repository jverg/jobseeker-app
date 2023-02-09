import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import getConfig from 'next/config';
import Router from 'next/router';
import useNotification from '@hooks/notification/useNotification';
import StateEnum from '@constants/state.enum';

const {
  publicRuntimeConfig: { BACKEND_URL },
} = getConfig();

const backEndUrl = `${BACKEND_URL}/api`;

const instance: AxiosInstance = axios.create({
  baseURL: backEndUrl,
  headers: {
    Authorization: typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('jwt')}` : '',
  },
});

const errorStatuses = [400, 403, 404, 422, 428];

/* istanbul ignore next */
instance.interceptors.response.use(
  // eslint-disable-next-line func-names
  function (response: AxiosResponse) {
    return response.data;
  },
  // eslint-disable-next-line func-names
  function (error: AxiosError) {
    const [authorizationWarning] = useNotification(
      StateEnum.WARNING,
      'You have no access to see this page',
      'Oops, your session has been expired or you have no access to see this page.' +
        'Please, login to see the details of the page.',
    );
    if (error.response?.statusText === 'Unauthorized' && error.response.config.url !== '/login') {
      Router.push('/login');
      authorizationWarning();
    }

    /**
     * Return the data for all 422, 428, 404, 400 statuses in order to
     * catch the messages from data
     */
    if (error?.response?.status && errorStatuses.includes(error?.response?.status)) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  },
);

export default instance;
