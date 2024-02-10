import axios from 'axios';

export interface UpdateProfileBody {
  name?: string;
  username?: string;
  password?: string;
  profilePic?: string | ArrayBuffer | null;
  bio?: string;
  email?: string;
}

export const getProfile = async (username: string) => {
  const res = await axios.get(`/api/users/${username}`);
  return res.data;
};

export const updateProfile = async (id: string, user: UpdateProfileBody) => {
  const res = await axios.patch(`/api/users/update/${id}`, user);
  return res.data;
};

export const followUnfollow = async (id: string) => {
  const res = await axios.patch(`/api/users/follow/${id}`);
  return res.data;
};
