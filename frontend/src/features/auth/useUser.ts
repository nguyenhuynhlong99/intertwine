import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../services/apiUser';
import useShowToast from '../../hooks/useShowToast';
import axios from 'axios';

export function useUser(username: string) {
  const { showToast } = useShowToast();

  const {
    isPending,
    data: user,
    error,
  } = useQuery({
    queryKey: ['user', username],
    queryFn: () => getProfile(String(username)),
    retry: false, //by default React Query will try to fetch the data 3 times in case it fails in the beginning.
  });
  if (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      showToast('Error', error?.response?.data?.error, 'error');
      return;
    }
    showToast('Error', 'Failed to get user profile', 'error');
  }

  // const user = data?.user || null;

  return { isPending, user };
}
