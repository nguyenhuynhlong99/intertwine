import { useParams } from 'react-router-dom';
import { useUserPosts } from './useUserPosts';
import PostList from './PostList';
import { Flex, Spinner, Text, useColorModeValue } from '@chakra-ui/react';

export default function CurrentUserPosts() {
  const { username } = useParams();
  const userPostsData = useUserPosts(String(username));
  const userPosts = userPostsData?.userPosts;
  const isPending = userPostsData?.isPending;

  const accentColor = useColorModeValue('accent.light', 'accent.dark');

  console.log(userPosts);

  if (isPending)
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} color={accentColor} />
      </Flex>
    );

  if (!isPending && userPosts?.length === 0) {
    return <Text>Start your first post</Text>;
  }

  return (
    <>
      <PostList posts={userPosts} />
    </>
  );
}
