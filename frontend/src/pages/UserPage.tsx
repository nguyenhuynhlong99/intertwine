import { Flex, Spinner, useColorModeValue } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useUser } from '../features/auth/useUser';
import UserInfo from '../components/UserInfo';
import useDocumentTitle from '../hooks/useDocumentTitle';
import CurrentUserAllPosts from '../features/posts/CurrentUserAllPosts';

export default function UserPage() {
  const { username } = useParams();

  const userData = useUser(String(username));
  const isGettingUserData = userData?.isPending;
  const user = userData?.user;

  const accentColor = useColorModeValue('accent.light', 'accent.dark');

  useDocumentTitle(`${user?.name} (${username})`);

  if (isGettingUserData)
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} color={accentColor} />
      </Flex>
    );

  // Dont forget to add not found page
  if (!user && !isGettingUserData) return null;

  return (
    <>
      <UserInfo />

      <CurrentUserAllPosts />
    </>
  );
}
