import { createContext } from 'react';
import User from '@models/user';

export type UserContextType = [User | {}, (s: User) => void];

const UserContext = createContext<UserContextType>([{}, () => {}]);

export default UserContext;
