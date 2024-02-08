import UserInfo from '../components/UserInfo';
import { Container } from '@chakra-ui/react';
import PostList from '../features/posts/PostList';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProfile } from '../services/apiUser';
import useShowToast from '../hooks/useShowToast';

export default function UserPage() {
  const [user, setUser] = useState();
  const { username } = useParams();
  const { showToast } = useShowToast();

  useEffect(() => {
    async function getUser() {
      try {
        const data = await getProfile(String(username));

        if (data?.error) {
          showToast('Failed to get user data', data.error, 'error');
          return;
        }
        setUser(data.data.user);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [username, showToast]);
  console.log(user);
  // Dont forget to add not found page
  if (!user) return null;

  return (
    <Container maxW="572px">
      <UserInfo user={user} />

      <PostList />
    </Container>
  );
}
