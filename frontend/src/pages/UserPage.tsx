import { Flex, Spinner, useColorModeValue } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useUser } from '../features/auth/useUser';
import UserInfo from '../components/UserInfo';
import CurrentUserPosts from '../features/posts/CurrentUserPosts';
import useDocumentTitle from '../hooks/useDocumentTitle';

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

      <CurrentUserPosts />
    </>
  );
}
