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
  // try {
  //   const res = await axios.post('/api/users/signup', user);
  //   return res.data;
  // } catch (error) {
  //   if (axios.isAxiosError(error)) {
  //     console.log(error.status);
  //     console.error(error.response);
  //     return error.response?.data;
  //   } else {
  //     console.error(error);
  //   }
  // }
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
  const res = await axios.get('/api/users/whoami');
  return res.data;
};
