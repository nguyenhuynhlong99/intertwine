import { Flex, Heading, Spinner, useColorModeValue } from '@chakra-ui/react';
import { useFeedPosts } from './useFeedPosts';
import PostList from './PostList';

export default function FeedPosts() {
  const feedData = useFeedPosts();

  const accentColor = useColorModeValue('accent.light', 'accent.dark');

  if (feedData?.isPending) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} color={accentColor} />
      </Flex>
    );
  }

  if (!feedData?.isPending && feedData?.feed?.length === 0) {
    return (
      <Heading as={'h3'} size={'lg'} textAlign={'center'} mt={4}>
        It's time for you to follow some users!
      </Heading>
    );
  }

  return (
    <>
      <PostList posts={feedData?.feed} />
    </>
  );
}
