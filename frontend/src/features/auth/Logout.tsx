import { useColorMode } from '@chakra-ui/react';
import { SignOut } from '@phosphor-icons/react';
// import { logout } from '../../services/apiAuth';
import useShowToast from '../../hooks/useShowToast';
// import { useSetRecoilState } from 'recoil';
// import userAtom from '../../atoms/userAtom';
import { useLogout } from './useLogout';

export default function Logout() {
  // const setUser = useSetRecoilState(userAtom);
  const { logout } = useLogout();
  const { colorMode } = useColorMode();
  const { showToast } = useShowToast();

  async function handleLogout() {
    try {
      await logout();
      // if (data?.error) {
      //   showToast('Error', 'Failed to log out', 'error');
      //   return;
      // }

      // localStorage.removeItem('intertwine-user');
      // setUser(null);
    } catch (error) {
      showToast('Error', 'Failed to log out', 'error');
      console.error(error);
    }
  }

  return (
    <button className="icon-container" onClick={handleLogout}>
      <SignOut
        size={26}
        color={colorMode === 'light' ? '#2856c3' : '#3c6bd7'}
      />
    </button>
  );
}
