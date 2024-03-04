import axios from 'axios';

export interface PostBody {
  postedBy: string;
  text: string;
  img?: string | ArrayBuffer | null;
}

export interface ReplyBody {
  text: string;
}

const postsApi = axios.create({
  baseURL: 'https://intertwine-server.onrender.com/api/posts',
  withCredentials: true,
});

export const getPost = async (id: string) => {
  const res = await postsApi.get(`/${id}`);
  return res.data;
};

export const getUserPosts = async (username: string) => {
  const res = await postsApi.get(`/user/${username}`);
  return res.data;
};

export const createPost = async (post: PostBody) => {
  const res = await postsApi.post('/', post);
  return res.data;
};

export const deletePost = async (id: string) => {
  const res = await postsApi.delete(`/${id}`);
  return res.data;
};

export const getFeedPosts = async () => {
  const res = await postsApi.get(`/feed`);
  return res.data;
};

export const likeUnlikePost = async (id: string) => {
  const res = await postsApi.patch(`/like/${id}`);
  return res.data;
};

export const replyToPost = async (id: string, reply: ReplyBody) => {
  const res = await postsApi.patch(`/reply/${id}`, reply);
  return res.data;
};

export const deleteReply = async (postId: string, replyId: string) => {
  const res = await postsApi.patch(`/${postId}/reply/${replyId}/delete`);
  return res.data;
};

export const getUserReplies = async (username: string) => {
  const res = await postsApi.get(`/user/${username}/replies`);
  return res.data;
};
