import { useQuery } from '@tanstack/react-query';
import useShowToast from '../../hooks/useShowToast';
import axios from 'axios';
import { getAllReplies } from '../../services/apiPost';

export function useReplies() {
  const { showToast } = useShowToast();

  const {
    isPending: isLoading,
    data,
    error,
  } = useQuery({
    queryKey: ['replies'],
    queryFn: getAllReplies,
    retry: false, //by default React Query will try to fetch the data 3 times in case it fails in the beginning.
  });
  if (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      showToast('Error', error?.response?.data?.error, 'error');
      return;
    }
    showToast('Error', 'Failed to get user replies', 'error');
  }

  const replies = data?.posts;

  return { isLoading, replies };
}