import axios from 'axios';

export interface UpdateProfileBody {
  name?: string;
  username?: string;
  password?: string;
  profilePic?: string | ArrayBuffer | null;
  bio?: string;
  email?: string;
}

export interface UserQuery {
  page?: number;
  limit?: number;
  username?: string;
}

const usersApi = axios.create({
  baseURL: 'https://intertwine-server.onrender.com/api/users',
  withCredentials: true,
});

export const getAllUsers = async (query: UserQuery) => {
  const params = { ...query };

  const res = await usersApi.get(`/`, { params });
  return res.data;
};

export const getProfile = async (username: string) => {
  const res = await usersApi.get(`/${username}`);
  return res.data;
};

export const updateProfile = async (id: string, user: UpdateProfileBody) => {
  const res = await usersApi.patch(`/update/${id}`, user);
  return res.data;
};

export const followUnfollow = async (id: string) => {
  const res = await usersApi.patch(`/follow/${id}`);
  return res.data;
};
