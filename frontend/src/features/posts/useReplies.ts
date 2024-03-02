import { useQuery } from '@tanstack/react-query';
import useShowToast from '../../hooks/useShowToast';
import axios from 'axios';
import { getUserReplies } from '../../services/apiPost';
import { useParams } from 'react-router-dom';

export function useReplies() {
  const { username } = useParams();
  const { showToast } = useShowToast();

  const {
    isPending: isLoading,
    data,
    error,
  } = useQuery({
    queryKey: ['replies', username],
    queryFn: () => getUserReplies(String(username)),
    retry: false, //by default React Query will try to fetch the data 3 times in case it fails in the beginning.
  });
  if (error) {
    if (axios.isAxiosError(error)) {
      showToast('Error', error?.response?.data?.error, 'error');
      return;
    }
    showToast('Error', 'Failed to get user replies', 'error');
  }

  const replies = data?.posts;

  return { isLoading, replies };
}
