import { useMutation, useQueryClient } from '@tanstack/react-query';
import { followUnfollow } from '../../services/apiUser';
import useShowToast from '../../hooks/useShowToast';
import axios from 'axios';

export function useFollow(username: string) {
  const queryClient = useQueryClient();
  const { showToast } = useShowToast();

  const { mutate: followUnfollowUser, isPending: isUpdating } = useMutation({
    mutationFn: (id: string) => followUnfollow(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', username] });
    },
    onError: (err) => {
      console.log(err);
      if (axios.isAxiosError(err)) {
        showToast('Error', err?.response?.data?.error, 'error');
        return;
      }
      showToast('Error', 'Failed to follow/unfollow user', 'error');
    },
  });
  return { followUnfollowUser, isUpdating };
}
