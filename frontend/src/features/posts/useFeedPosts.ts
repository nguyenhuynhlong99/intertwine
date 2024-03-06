import { useQuery } from '@tanstack/react-query';
import useShowToast from '../../hooks/useShowToast';
import axios from 'axios';
import { getFeedPosts } from '../../services/apiPost';
import { useLogout } from '../auth/useLogout';
import { useEffect } from 'react';

export function useFeedPosts() {
  const { showToast } = useShowToast();
  const { logout } = useLogout();

  const { isPending, data, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getFeedPosts,
    retry: false, //by default React Query will try to fetch the data 3 times in case it fails in the beginning.
  });

  useEffect(() => {
    if (error) {
      if (axios.isAxiosError(error)) {
        showToast('Error', error?.response?.data?.error, 'error');
        logout();
        return;
      }
      showToast('Error', 'Failed to get feed posts', 'error');
      logout();
    }
  }, [error, logout, showToast]);

  const feed = data?.feed;

  return { isPending, feed };
}
