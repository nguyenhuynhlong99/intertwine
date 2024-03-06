import { useMutation, useQueryClient } from '@tanstack/react-query';
import useShowToast from '../../hooks/useShowToast';
import axios, { AxiosError } from 'axios';
import { deleteReply as deleteReplyApi } from '../../services/apiPost';
import { useLogout } from '../auth/useLogout';

interface MutationFnParameter {
  postId: string;
  replyId: string;
}

function useDeleteReply(id: string) {
  const queryClient = useQueryClient();
  const { showToast } = useShowToast();
  const { logout } = useLogout();

  const { mutate: deleteReply, isPending: isDeleting } = useMutation({
    mutationFn: ({ postId, replyId }: MutationFnParameter) =>
      deleteReplyApi(postId, replyId),
    onSuccess: () => {
      showToast('Success', 'Deleted reply successfully', 'success');
      queryClient.invalidateQueries({ queryKey: ['post', id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        showToast('Error', err?.response?.data?.error, 'error');
        logout();
        return;
      }
      showToast('Error', 'Failed to delete reply', 'error');
      logout();
    },
  });

  return { deleteReply, isDeleting };
}

export default useDeleteReply;
