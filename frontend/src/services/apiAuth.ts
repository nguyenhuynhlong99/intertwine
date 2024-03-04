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

export const signup = async (user: SignUpBody) => {
  // Don't need try catch because of React Query
  const res = await axios.post('/api/users/signup', user);
  return res.data;
};

export const login = async (user: LoginBody) => {
  const res = await axios.post('/api/users/login', user);
  return res.data;
};

export const logout = async () => {
  const res = await axios.post('/api/users/logout');
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await axios.get('/api/users/whoami', { withCredentials: true });
  return res.data;
};
