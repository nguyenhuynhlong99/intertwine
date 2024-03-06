import axios from 'axios';
import { getToken } from '../utils/userLocalStorage';

interface SignUpBody {
  email: string;
  name: string;
  username: string;
  password: string;
}

interface LoginBody {
  username: string;
  password: string;
}

const usersApi = axios.create({
  // baseURL: 'https://intertwine-server.onrender.com/api/users',
  baseURL: '/api/users',
});

export const signup = async (user: SignUpBody) => {
  // Don't need try catch because of React Query
  const res = await usersApi.post('/signup', user);
  return res.data;
};

export const login = async (user: LoginBody) => {
  const res = await usersApi.post('/login', user);
  return res.data;
};

export const logout = async () => {
  const res = await usersApi.post('/logout');
  return res.data;
};

export const getCurrentUser = async () => {
  const token = await getToken();

  if (!token) return null;

  const res = await usersApi.get('/whoami', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
