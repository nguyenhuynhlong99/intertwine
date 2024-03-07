import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../services/apiUser';
import { getToken } from '../../utils/userLocalStorage';
import axios from 'axios';
import useShowToast from '../../hooks/useShowToast';
import { useLogout } from './useLogout';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function useUser(username: string) {
  const token = getToken();
  const { showToast } = useShowToast();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const {
    isPending,
    data: user,
    error,
  } = useQuery({
    queryKey: ['user', username],
    queryFn: () => getProfile(String(username)),
    retry: false, //by default React Query will try to fetch the data 3 times in case it fails in the beginning.
  });

  useEffect(() => {
    if (!token || error) {
      if (axios.isAxiosError(error)) {
        showToast('Error', error?.response?.data?.error, 'error');
        if (error?.response?.data?.error !== 'User not found') {
          logout();
          navigate('/auth');
        }
        return;
      }
      showToast('Error', "Failed to get users's data", 'error');
    }
  }, [token, error, showToast, logout, navigate]);

  return { isPending, user, error };
}
