import { Container } from '@chakra-ui/react';
import FeedPosts from '../features/posts/FeedPosts';

export default function HomePage() {
  return (
    <Container maxW="572px">
      <FeedPosts />
    </Container>
  );
}
