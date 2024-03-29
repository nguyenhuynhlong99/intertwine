import { useMutation, useQueryClient } from '@tanstack/react-query';
import useShowToast from '../../hooks/useShowToast';
import axios, { AxiosError } from 'axios';
import { deletePost as deleteApi } from '../../services/apiPost';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLogout } from '../auth/useLogout';

function useDeletePost(id: string) {
  const queryClient = useQueryClient();
  const { showToast } = useShowToast();
  const location = useLocation();
  const pathname = location?.pathname;
  const isAtPostPage = pathname.includes('post');
  const navigate = useNavigate();
  const { logout } = useLogout();

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: deleteApi,
    onSuccess: () => {
      showToast('Success', 'Deleted post successfully', 'success');
      queryClient.invalidateQueries({ queryKey: ['post', id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      if (isAtPostPage) navigate(-1);
    },
    onError: (err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        showToast('Error', err?.response?.data?.error, 'error');
        logout();
        return;
      }
      showToast('Error', 'Failed to delete post', 'error');
      logout();
    },
  });

  return { deletePost, isDeleting };
}

export default useDeletePost;
