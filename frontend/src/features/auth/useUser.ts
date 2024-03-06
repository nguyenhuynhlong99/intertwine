import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../services/apiUser';
import { useEffect } from 'react';
import { getToken } from '../../utils/userLocalStorage';
import { useLogout } from './useLogout';
import axios from 'axios';
import useShowToast from '../../hooks/useShowToast';

export function useUser(username: string) {
  const token = getToken();
  const { logout } = useLogout();
  const { showToast } = useShowToast();

  const {
    isPending,
    data: user,
    error,
  } = useQuery({
    queryKey: ['user', username],
    queryFn: () => getProfile(String(username)),
    retry: false, //by default React Query will try to fetch the data 3 times in case it fails in the beginning.
  });

  if (error) console.log(error);

  useEffect(() => {
    if (!token || error) {
      if (axios.isAxiosError(error)) {
        showToast('Error', error?.response?.data?.error, 'error');
        logout();
        return;
      }
      showToast('Error', "Failed to get users's data", 'error');
      logout();
    }
  }, [token, error, logout, showToast]);

  return { isPending, user };
}
