import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../features/auth/useCurrentUser';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const navigate = useNavigate();
  const { isPending, isAuthenticated } = useCurrentUser();

  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate('/auth');
  }, [isPending, navigate, isAuthenticated]);

  if (isAuthenticated) {
    return children;
  }
}
