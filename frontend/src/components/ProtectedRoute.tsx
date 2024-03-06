import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCurrentUser } from '../features/auth/useCurrentUser';
import { getToken } from '../utils/userLocalStorage';
import { useLogout } from '../features/auth/useLogout';

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { data, isPending } = useCurrentUser();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    if (!token || (!isPending && !data?._id)) {
      logout();
      navigate('/auth');
    }
  }, [navigate, isPending, data, logout, token]);

  if (!isPending && data?._id) {
    return children;
  }
}
