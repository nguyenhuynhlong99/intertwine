import { useParams } from 'react-router-dom';
import { useUserPosts } from './useUserPosts';
import PostList from './PostList';
import { Flex, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
import { getUser } from '../../utils/userLocalStorage';

export default function CurrentUserPosts() {
  const { username } = useParams();
  const currentUser = getUser();

  const userPostsData = useUserPosts(String(username));
  const userPosts = userPostsData?.userPosts;
  const isPending = userPostsData?.isPending;

  const accentColor = useColorModeValue('accent.light', 'accent.dark');
  const primaryColor = useColorModeValue('primary.light', 'primary.dark');

  console.log(userPosts);

  if (isPending)
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} color={accentColor} />
      </Flex>
    );

  if (!isPending && userPosts?.length === 0) {
    return (
      <Text
        textAlign={'center'}
        color={primaryColor}
        fontSize={'lg'}
        fontWeight={700}
      >
        {currentUser?.username === username
          ? 'Start your first post'
          : "This user hasn't posted yet"}
      </Text>
    );
  }

  return (
    <>
      <PostList posts={userPosts} />
    </>
  );
}
