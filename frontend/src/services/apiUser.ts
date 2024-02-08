import axios from 'axios';

interface UpdateProfileBody {
  name?: string;
  username?: string;
  password?: string;
  profilePic?: string | ArrayBuffer | null;
  bio?: string;
  email?: string;
}

export const getProfile = async (username: string) => {
  try {
    const res = await axios.get(`/api/users/${username}`);
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

export const followUnfollow = async (id: string) => {
  try {
    const res = await axios.patch(`/api/users/follow/${id}`);
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
