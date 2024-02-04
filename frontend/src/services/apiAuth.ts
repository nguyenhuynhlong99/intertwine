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

interface UpdateProfileBody {
  name?: string;
  username?: string;
  password?: string;
  profilePic?: string | ArrayBuffer | null;
  bio?: string;
  email?: string;
}

export const signup = async (user: SignUpBody) => {
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

export const login = async (user: LoginBody) => {
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

export const updateProfile = async (id: string, user: UpdateProfileBody) => {
  try {
    const res = await axios.patch(`/api/users/update/${id}`, user);
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
