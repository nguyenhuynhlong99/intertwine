import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

export function useCurrentUser() {
  const { isPending, data, error } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    retry: false, //by default React Query will try to fetch the data 3 times in case it fails in the beginning.
    // staleTime: 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  if (error) {
    console.log(error);
  }

  console.log(data);

  return { isPending, data };
}
