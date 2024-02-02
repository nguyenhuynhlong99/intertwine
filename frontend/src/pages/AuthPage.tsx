import { useRecoilValue } from 'recoil';
import authScreenAtom from '../atoms/authAtom';
import SignUp from '../features/auth/SignUp';
import Login from '../features/auth/Login';

export default function AuthPage() {
  const authScreenState = useRecoilValue(authScreenAtom);

  return <>{authScreenState === 'login' ? <Login /> : <SignUp />}</>;
}
