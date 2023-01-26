import axiosInstance from '@utils/http-client';

export default function loginUser(email: string, password: string): Promise<any> {
  return axiosInstance.post('/login', { email, password });
}
