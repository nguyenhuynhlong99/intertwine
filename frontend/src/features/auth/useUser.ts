import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../services/apiUser';

export function useUser(username: string) {
  const { isPending, data: user } = useQuery({
    queryKey: ['user', username],
    queryFn: () => getProfile(String(username)),
    retry: false, //by default React Query will try to fetch the data 3 times in case it fails in the beginning.
  });

  return { isPending, user };
}
