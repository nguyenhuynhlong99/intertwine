import axios from 'axios';
import { getToken } from '../utils/userLocalStorage';

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
  // baseURL: `https://intertwine-server.onrender.com/api/users`,
  baseURL: '/api/users',
});

export const getAllUsers = async (query: UserQuery) => {
  const token = getToken();
  const params = { ...query };

  const res = await usersApi.get(`/`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getProfile = async (username: string) => {
  const token = getToken();
  const res = await usersApi.get(`/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateProfile = async (id: string, user: UpdateProfileBody) => {
  const token = getToken();
  const res = await usersApi.patch(`/update/${id}`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const followUnfollow = async (id: string) => {
  const token = getToken();
  const res = await usersApi.patch(
    `/follow/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
