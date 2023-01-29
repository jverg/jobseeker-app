import axiosInstance from '@utils/http-client';
import { UserLoginResponse } from '@models/user';

export default function loginUser(email: string, password: string): Promise<UserLoginResponse> {
  return axiosInstance.post('/login', { email, password });
}
