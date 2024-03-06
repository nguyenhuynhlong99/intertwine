import { useQuery } from '@tanstack/react-query';
import useShowToast from '../../hooks/useShowToast';
import axios from 'axios';
import { getPost } from '../../services/apiPost';
import { useLogout } from '../auth/useLogout';
import { useEffect } from 'react';

function usePost(id: string) {
  const { showToast } = useShowToast();
  const { logout } = useLogout();

  const {
    isPending,
    data: post,
    error,
  } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id),
    retry: false, //by default React Query will try to fetch the data 3 times in case it fails in the beginning.
  });

  useEffect(() => {
    if (error) {
      if (axios.isAxiosError(error)) {
        showToast('Error', error?.response?.data?.error, 'error');
        logout();
        return;
      }
      showToast('Error', 'Failed to get post data', 'error');
      logout();
    }
  }, [error, logout, showToast]);

  return { isPending, post };
}

export default usePost;
