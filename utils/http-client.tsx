import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import getConfig from 'next/config';

const {
    publicRuntimeConfig: { BACKEND_URL },
} = getConfig();

const backEndUrl = `${BACKEND_URL}`;

const instance: AxiosInstance = axios.create({ baseURL: backEndUrl, withCredentials: true });

const errorStatuses = [400, 403, 404, 422, 428];

/* istanbul ignore next */
instance.interceptors.response.use(
    // eslint-disable-next-line func-names
    function (response: AxiosResponse) {
        return response.data;
    },
    // eslint-disable-next-line func-names
    function (error: AxiosError) {
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