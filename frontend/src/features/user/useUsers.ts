import { useQuery, useQueryClient } from '@tanstack/react-query';
import useShowToast from '../../hooks/useShowToast';
import axios from 'axios';
import { UserQuery, getAllUsers } from '../../services/apiUser';
import { useLogout } from '../auth/useLogout';
import { useEffect } from 'react';

export function useUsers(query: UserQuery) {
  const { showToast } = useShowToast();
  const queryClient = useQueryClient();
  const { logout } = useLogout();

  if (!query.username) delete query.username;

  function getFromUserCache(key: string | undefined) {
    if (!key) return queryClient.getQueryData(['users']);
    return queryClient.getQueryData(['users', key]);
  }

  const {
    isPending: isLoading,
    data,
    error,
  } = useQuery({
    queryKey: ['users', query.username],
    queryFn: async () => {
      const cache = getFromUserCache(query.username);
      if (cache) return cache;
      return await getAllUsers(query);
    },
    retry: false, //by default React Query will try to fetch the data 3 times in case it fails in the beginning.
  });

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

  return { isLoading, data };
}
