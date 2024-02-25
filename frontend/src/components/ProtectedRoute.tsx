import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCurrentUser } from '../features/auth/useCurrentUser';

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { data, isPending } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !data?._id) navigate('/auth');
  }, [navigate, isPending, data]);

  if (!isPending && data?._id) {
    return children;
  }
}
