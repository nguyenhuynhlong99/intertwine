import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser } from '../utils/userLocalStorage';

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const currentUser = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate('/auth');
  }, [navigate, currentUser]);

  if (currentUser) {
    return children;
  }
}
