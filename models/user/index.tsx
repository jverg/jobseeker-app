interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface UserLoginResponse {
  token: {
    accessToken: string;
    expiresIn: string;
    tokenType: string;
  };
  user: User;
}

export default User;
