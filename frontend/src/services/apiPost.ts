import axios from 'axios';

export const getPost = async (id: string) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
