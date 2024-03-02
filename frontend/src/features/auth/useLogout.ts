import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../../utils/userLocalStorage';
import useShowToast from '../../hooks/useShowToast';
import axios, { AxiosError } from 'axios';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useShowToast();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries(); //remove all react query caches
      removeUser();
      navigate('/auth', { replace: true });
    },
    onError: (err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        showToast('Error', err?.response?.data?.error, 'error');
        return;
      }
      showToast('Error', 'Failed to log out', 'error');
    },
  });

  return { logout, isPending };
}
