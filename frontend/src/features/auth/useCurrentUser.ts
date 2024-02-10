import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';
import {
  getUser as getUserFromLS,
  removeUser as removeUserFromLS,
  // saveUser,
} from '../../utils/userLocalStorage';
// import { useEffect } from 'react';

export function useCurrentUser() {
  const userFromLS = getUserFromLS();

  const { isPending, data, error } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    retry: false, //by default React Query will try to fetch the data 3 times in case it fails in the beginning.
    initialData: userFromLS,
    staleTime: 1000,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  });
  if (error) {
    removeUserFromLS();
  }

  // useEffect(() => {
  //   if (!userFromLS) {
  //     removeUserFromLS();
  //   } else {
  //     saveUser(user);
  //   }
  // }, [user]);
  console.log(data?.user);

  const user = userFromLS ? data : data?.user;
  const isAuthenticated = user ? true : false;

  return { isPending, user, isAuthenticated };
}
