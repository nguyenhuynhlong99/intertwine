// import UserInfo from '../components/UserInfo';
import { Container, Flex, Spinner, useColorModeValue } from '@chakra-ui/react';
import PostList from '../features/posts/PostList';
import { useParams } from 'react-router-dom';
import { useUser } from '../features/auth/useUser';
import UserInfo from '../components/UserInfo';

export default function UserPage() {
  const { username } = useParams();
  const data = useUser(String(username));
  const isPending = data?.isPending;
  const user = data?.user;
  const accentColor = useColorModeValue('accent.light', 'accent.dark');

  // Dont forget to add not found page
  if (isPending)
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} color={accentColor} />
      </Flex>
    );

  if (!user && !isPending) return null;

  return (
    <Container maxW="572px">
      <UserInfo />

      <PostList />
    </Container>
  );
}
