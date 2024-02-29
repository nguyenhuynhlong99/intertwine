import { Flex, Spinner, useColorModeValue } from '@chakra-ui/react';
import { useParams, Navigate } from 'react-router-dom';
import { useUser } from '../features/auth/useUser';
import UserInfo from '../components/UserInfo';
import useDocumentTitle from '../hooks/useDocumentTitle';
import CurrentUserAllPosts from '../features/posts/CurrentUserAllPosts';

export default function UserPage() {
  const { username } = useParams();

  const userData = useUser(String(username));
  const isLoading = userData?.isPending;
  const user = userData?.user;

  const accentColor = useColorModeValue('accent.light', 'accent.dark');

  useDocumentTitle(`${user?.name} (${username})`);

  if (isLoading)
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} color={accentColor} />
      </Flex>
    );

  // Dont forget to add not found page
  if (!isLoading && !user) {
    return <Navigate to="/404" replace={true} />;
  }

  return (
    <>
      <UserInfo />

      <CurrentUserAllPosts />
    </>
  );
}
