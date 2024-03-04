import axios from 'axios';

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
  baseURL: 'https://intertwine-server.onrender.com/api/users',
  withCredentials: true,
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
  const res = await usersApi.get('/whoami', { withCredentials: true });
  return res.data;
};
