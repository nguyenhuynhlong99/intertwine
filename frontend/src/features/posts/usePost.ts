import { useQuery } from '@tanstack/react-query';
import useShowToast from '../../hooks/useShowToast';
import axios from 'axios';
import { getPost } from '../../services/apiPost';

function usePost(id: string) {
  const { showToast } = useShowToast();

  const {
    isPending,
    data: post,
    error,
  } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id),
    retry: false, //by default React Query will try to fetch the data 3 times in case it fails in the beginning.
  });
  if (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      showToast('Error', error?.response?.data?.error, 'error');
      return;
    }
    showToast('Error', 'Failed to get post data', 'error');
  }

  return { isPending, post };
}

export default usePost;
