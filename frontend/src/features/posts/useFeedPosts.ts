import { useQuery } from '@tanstack/react-query';
import useShowToast from '../../hooks/useShowToast';
import axios from 'axios';
import { getFeedPosts } from '../../services/apiPost';

export function useFeedPosts() {
  const { showToast } = useShowToast();

  const { isPending, data, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getFeedPosts,
    retry: false, //by default React Query will try to fetch the data 3 times in case it fails in the beginning.
  });
  if (error) {
    if (axios.isAxiosError(error)) {
      showToast('Error', error?.response?.data?.error, 'error');
      return;
    }
    showToast('Error', 'Failed to get feed posts', 'error');
  }

  const feed = data?.feed;

  return { isPending, feed };
}
