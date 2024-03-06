import { useColorMode } from '@chakra-ui/react';
import { SignOut } from '@phosphor-icons/react';
import { useLogout } from './useLogout';

export default function Logout() {
  const { colorMode } = useColorMode();
  const { logout } = useLogout();

  function handleLogout() {
    logout();
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
