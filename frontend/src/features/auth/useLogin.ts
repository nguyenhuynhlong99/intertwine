import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/apiAuth';
import useShowToast from '../../hooks/useShowToast';
import { removeUser, saveUser } from '../../utils/userLocalStorage';
import axios, { AxiosError } from 'axios';

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useShowToast();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      console.log(user?.user);
      queryClient.setQueryData(['user'], user?.user);
      saveUser(user?.user);
      navigate('/', { replace: true });
    },
    onError: (err: Error | AxiosError) => {
      console.log(err);
      removeUser();
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
