import { useMutation, useQueryClient } from '@tanstack/react-query';
import useShowToast from '../../hooks/useShowToast';
import axios, { AxiosError } from 'axios';
import { likeUnlikePost } from '../../services/apiPost';
import { useLogout } from '../auth/useLogout';

function useLikePost(id: string) {
  const queryClient = useQueryClient();
  const { showToast } = useShowToast();
  const { logout } = useLogout();

  const { mutate: likePost, isPending } = useMutation({
    mutationFn: likeUnlikePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        showToast('Error', err?.response?.data?.error, 'error');
        logout();
        return;
      }
      showToast('Error', 'Failed to like/dislike post', 'error');
      logout();
    },
  });

  return { likePost, isPending };
}

export default useLikePost;
