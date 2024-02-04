import UserInfo from '../components/UserInfo';
import { Container } from '@chakra-ui/react';
import PostList from '../features/posts/PostList';
import { useEffect } from 'react';
import { getPost } from '../services/apiPost';

export default function UserPage() {
  useEffect(() => {
    async function fetchPost() {
      const data = await getPost('65b6f34f2dcd760794e39c90');
      console.log(data);
    }
    fetchPost();
  }, []);

  return (
    <Container maxW="572px">
      <UserInfo />

      <PostList />
    </Container>
  );
}
