import { useColorMode } from '@chakra-ui/react';
import { SignOut } from '@phosphor-icons/react';

// import { useLogout } from './useLogout';
import { removeToken } from '../../utils/userLocalStorage';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export default function Logout() {
  // const { logout } = useLogout();
  const queryClient = useQueryClient();
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  function handleLogout() {
    // logout();
    queryClient.removeQueries();
    removeToken();
    navigate('/auth');
  }

  return (
    <button className="icon-container" onClick={handleLogout}>
      <SignOut
        size={32}
        color={colorMode === 'light' ? '#2856c3' : '#3c6bd7'}
      />
    </button>
  );
}
