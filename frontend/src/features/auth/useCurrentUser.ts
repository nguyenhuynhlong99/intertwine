import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';
import { getToken } from '../../utils/userLocalStorage';
import { useEffect } from 'react';
import { useLogout } from './useLogout';
import axios from 'axios';
import useShowToast from '../../hooks/useShowToast';

export function useCurrentUser() {
  const token = getToken();
  const { logout } = useLogout();
  const { showToast } = useShowToast();

  const { isPending, data, error } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    retry: false, //by default React Query will try to fetch the data 3 times in case it fails in the beginning.
    // staleTime: 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (!token) logout();

  useEffect(() => {
    if (error) {
      if (axios.isAxiosError(error)) {
        showToast('Error', error?.response?.data?.error, 'error');
        logout();
        return;
      }
      showToast('Error', "Failed to get users's data", 'error');
      logout();
    }
  }, [error, logout, showToast]);

  return { isPending, data };
}
