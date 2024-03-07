import { useQuery } from '@tanstack/react-query';
import useShowToast from '../../hooks/useShowToast';
import axios from 'axios';
import { getUserPosts } from '../../services/apiPost';
import { useEffect } from 'react';
import { useLogout } from '../auth/useLogout';
import { useNavigate } from 'react-router-dom';

export function useUserPosts(username: string) {
  const { showToast } = useShowToast();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const {
    isPending,
    data: userPosts,
    error,
  } = useQuery({
    queryKey: ['posts', username],
    queryFn: () => getUserPosts(username),
    retry: false, //by default React Query will try to fetch the data 3 times in case it fails in the beginning.
  });

  useEffect(() => {
    if (error) {
      if (axios.isAxiosError(error)) {
        showToast('Error', error?.response?.data?.error, 'error');
        if (error?.response?.data?.error !== 'User not found') {
          logout();
          navigate('/auth');
        }
        return;
      }
      showToast('Error', 'Failed to get user posts', 'error');
    }
  }, [error, showToast, logout, navigate]);

  return { isPending, userPosts, error };
}
