import { useMutation, useQueryClient } from '@tanstack/react-query';
import { followUnfollow } from '../../services/apiUser';
import useShowToast from '../../hooks/useShowToast';
import axios from 'axios';
import { useLogout } from '../auth/useLogout';

export function useFollow(username: string) {
  const queryClient = useQueryClient();
  const { showToast } = useShowToast();
  const { logout } = useLogout();

  const { mutate: followUnfollowUser, isPending: isUpdating } = useMutation({
    mutationFn: (id: string) => followUnfollow(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', username] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        showToast('Error', err?.response?.data?.error, 'error');
        logout();
        return;
      }
      showToast('Error', 'Failed to follow/unfollow user', 'error');
      logout();
    },
  });
  return { followUnfollowUser, isUpdating };
}
