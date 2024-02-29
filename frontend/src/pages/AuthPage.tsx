import { useRecoilValue } from 'recoil';
import authScreenAtom from '../atoms/authAtom';
import SignUp from '../features/auth/SignUp';
import Login from '../features/auth/Login';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../features/auth/useCurrentUser';

export default function AuthPage() {
  const { data, isPending } = useCurrentUser();

  const authScreenState = useRecoilValue(authScreenAtom);
  const navigate = useNavigate();

  useDocumentTitle(authScreenState === 'login' ? 'Login' : 'Sign up');

  if (!isPending && data?._id) {
    navigate('/');
  }

  return <>{authScreenState === 'login' ? <Login /> : <SignUp />}</>;
}
