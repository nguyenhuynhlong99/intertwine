import { useMutation, useQueryClient } from '@tanstack/react-query';
import useShowToast from '../../hooks/useShowToast';
import axios, { AxiosError } from 'axios';
import { createPost as createPostApi } from '../../services/apiPost';
import { useLogout } from '../auth/useLogout';

function useCreatePost() {
  const queryClient = useQueryClient();
  const { showToast } = useShowToast();
  const { logout } = useLogout();

  const { mutate: createPost, isPending: isCreating } = useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      showToast('Success', 'Created post successfully', 'success');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        showToast('Error', err?.response?.data?.error, 'error');
        logout();
        return;
      }
      showToast('Error', 'Failed to create post', 'error');
      logout();
    },
  });

  return { createPost, isCreating };
}

export default useCreatePost;
