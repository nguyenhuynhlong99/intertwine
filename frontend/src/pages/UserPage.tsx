// import UserInfo from '../components/UserInfo';
import { Container } from '@chakra-ui/react';
import PostList from '../features/posts/PostList';
import { useParams } from 'react-router-dom';
import { useUser } from '../features/auth/useUser';
import UserInfo from '../components/UserInfo';

export default function UserPage() {
  const { username } = useParams();
  const data = useUser(String(username));
  const isPending = data?.isPending;
  const user = data?.user;

  // Dont forget to add not found page
  if (!user && !isPending) return null;

  return (
    <Container maxW="572px">
      <UserInfo />

      <PostList />
    </Container>
  );
}
