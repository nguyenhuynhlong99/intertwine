import { useRecoilValue } from 'recoil';
import authScreenAtom from '../atoms/authAtom';
import SignUp from '../features/auth/SignUp';
import Login from '../features/auth/Login';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function AuthPage() {
  const authScreenState = useRecoilValue(authScreenAtom);
  useDocumentTitle(authScreenState === 'login' ? 'Login' : 'Sign up');

  return <>{authScreenState === 'login' ? <Login /> : <SignUp />}</>;
}
