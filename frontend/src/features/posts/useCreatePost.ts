import { useMutation, useQueryClient } from '@tanstack/react-query';
import useShowToast from '../../hooks/useShowToast';
import axios, { AxiosError } from 'axios';
import { createPost as createPostApi } from '../../services/apiPost';

function useCreatePost() {
  const queryClient = useQueryClient();
  const { showToast } = useShowToast();

  const { mutate: createPost, isPending: isCreating } = useMutation({
    mutationFn: createPostApi,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['post'] });
      showToast('Success', 'Created post successfully', 'success');
    },
    onError: (err: Error | AxiosError) => {
      console.log(err);
      if (axios.isAxiosError(err)) {
        showToast('Error', err?.response?.data?.error, 'error');
        return;
      }
      showToast('Error', 'Failed to create post', 'error');
    },
  });

  return { createPost, isCreating };
}

export default useCreatePost;
