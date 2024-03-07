import axios from 'axios';
import { getToken } from '../utils/userLocalStorage';

export interface PostBody {
  postedBy: string;
  text: string;
  img?: string | ArrayBuffer | null;
}

export interface ReplyBody {
  text: string;
}

const postsApi = axios.create({
  // baseURL: `https://intertwine-server.onrender.com/api/posts`,
  baseURL: '/api/posts',
});

export const getPost = async (id: string) => {
  const token = getToken();

  const res = await postsApi.get(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getUserPosts = async (username: string) => {
  const token = getToken();
  const res = await postsApi.get(`/user/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createPost = async (post: PostBody) => {
  const token = getToken();

  const res = await postsApi.post('/', post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deletePost = async (id: string) => {
  const token = getToken();
  const res = await postsApi.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getFeedPosts = async () => {
  const token = getToken();

  const res = await postsApi.get(`/feed`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const likeUnlikePost = async (id: string) => {
  const token = getToken();
  const res = await postsApi.patch(
    `/like/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const replyToPost = async (id: string, reply: ReplyBody) => {
  const token = getToken();
  const res = await postsApi.patch(`/reply/${id}`, reply, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteReply = async (postId: string, replyId: string) => {
  const token = getToken();
  const res = await postsApi.patch(
    `/${postId}/reply/${replyId}/delete`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getUserReplies = async (username: string) => {
  const token = getToken();
  const res = await postsApi.get(`/user/${username}/replies`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
