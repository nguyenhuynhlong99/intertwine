import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/apiAuth';
import useShowToast from '../../hooks/useShowToast';
import axios, { AxiosError } from 'axios';
import { saveToken } from '../../utils/userLocalStorage';

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useShowToast();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      saveToken(data?.token);
      queryClient.setQueryData(['user'], data?.user);
      navigate('/', { replace: true });
    },
    onError: (err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        showToast('Error', err?.response?.data?.error, 'error');
        return;
      }
      showToast('Error', 'Failed to login', 'error');
    },
  });

  return { login, isPending };
}

export default useLogin;
