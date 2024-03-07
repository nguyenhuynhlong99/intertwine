import { useQuery } from '@tanstack/react-query';
import useShowToast from '../../hooks/useShowToast';
import axios from 'axios';
import { getFeedPosts } from '../../services/apiPost';
import { useEffect } from 'react';
import { useLogout } from '../auth/useLogout';
import { useNavigate } from 'react-router-dom';

export function useFeedPosts() {
  const { showToast } = useShowToast();
  const { logout } = useLogout();
  const navigate = useNavigate();

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
        navigate('/auth');
        return;
      }
      showToast('Error', 'Failed to get feed posts', 'error');
    }
  }, [error, showToast, navigate, logout]);

  const feed = data?.feed;

  return { isPending, feed, error };
}
