import axios from 'axios';

export interface PostBody {
  postedBy: string;
  text: string;
  img?: string | ArrayBuffer | null;
}

export const getPost = async (id: string) => {
  const res = await axios.get(`/api/posts/${id}`);
  return res.data;
};

export const createPost = async (post: PostBody) => {
  const res = await axios.post('/api/posts', post);
  return res.data;
};

export const getFeedPosts = async () => {
  const res = await axios.get(`/api/posts/feed`);
  return res.data;
};

export const likeUnlikePost = async (id: string) => {
  const res = await axios.patch(`/api/posts/like/${id}`);
  return res.data;
};
