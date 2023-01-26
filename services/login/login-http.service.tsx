import axiosInstance from '@utils/http-client';

export function loginUser(email: string, password: string): Promise<any> {
    return axiosInstance.post('api/login', { email, password });
}