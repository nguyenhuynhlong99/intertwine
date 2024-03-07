import { useQuery } from '@tanstack/react-query';
import useShowToast from '../../hooks/useShowToast';
import axios from 'axios';
import { getUserReplies } from '../../services/apiPost';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useLogout } from '../auth/useLogout';

export function useReplies() {
  const { username } = useParams();
  const { showToast } = useShowToast();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    data,
    error,
  } = useQuery({
    queryKey: ['replies', username],
    queryFn: () => getUserReplies(String(username)),
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
      showToast('Error', 'Failed to get user replies', 'error');
    }
  }, [error, showToast, logout, navigate]);

  const posts = data?.posts;

  return { isLoading, posts, error };
}
