import { useQuery } from '@tanstack/react-query';
import useShowToast from '../../hooks/useShowToast';
import axios from 'axios';
import { getUserPosts } from '../../services/apiPost';

export function useUserPosts(username: string) {
  const { showToast } = useShowToast();

  const {
    isPending,
    data: userPosts,
    error,
  } = useQuery({
    queryKey: ['posts', username],
    queryFn: () => getUserPosts(username),
    retry: false, //by default React Query will try to fetch the data 3 times in case it fails in the beginning.
  });
  if (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      showToast('Error', error?.response?.data?.error, 'error');
      return;
    }
    showToast('Error', 'Failed to get user posts', 'error');
  }

  return { isPending, userPosts };
}