import { useColorMode } from '@chakra-ui/react';
import { SignOut } from '@phosphor-icons/react';
import { useLogout } from './useLogout';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const { colorMode } = useColorMode();
  const { logout } = useLogout();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
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
