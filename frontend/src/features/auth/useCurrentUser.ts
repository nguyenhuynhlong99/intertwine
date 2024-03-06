import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';
import { getToken, removeToken } from '../../utils/userLocalStorage';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function useCurrentUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const token = getToken();

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
    queryClient.removeQueries();
    removeToken();
  }

  useEffect(() => {
    if (!token) {
      queryClient.removeQueries();
      navigate('/auth');
    }
  }, [token, navigate, queryClient]);

  return { isPending, data };
}
