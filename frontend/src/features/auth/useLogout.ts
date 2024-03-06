import { useQueryClient } from '@tanstack/react-query';
import { removeToken } from '../../utils/userLocalStorage';

export function useLogout() {
  const queryClient = useQueryClient();

  const logout = () => {
    removeToken();
    queryClient.removeQueries();
  };

  return { logout };
}
