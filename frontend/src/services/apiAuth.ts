import axios from 'axios';

interface IAuth {
  email?: string;
  name?: string;
  username: string;
  password: string;
}

export const signup = async (user: IAuth) => {
  try {
    const res = await axios.post('/api/users/signup', user);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status);
      console.error(error.response);
      return error.response?.data;
    } else {
      console.error(error);
    }
  }
};

export const login = async (user: IAuth) => {
  try {
    const res = await axios.post('/api/users/login', user);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status);
      console.error(error.response);
      return error.response?.data;
    } else {
      console.error(error);
    }
  }
};

export const logout = async () => {
  try {
    const res = await axios.get('/api/users/logout');
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status);
      console.error(error.response);
      return error.response?.data;
    } else {
      console.error(error);
    }
  }
};
