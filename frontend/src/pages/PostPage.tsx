import { Container } from '@chakra-ui/react';
import PostCard from '../features/posts/PostCard';

export default function PostPage() {
  return (
    <Container maxW="572px" mt={4}>
      <PostCard
        variant="postPage"
        likes={8}
        replies={4}
        content="Summer is for falling in love - Sarah Kang"
        postImg="https://blog.cvcavets.com/hs-fs/hubfs/9.jpg?width=334&name=9.jpg"
      />
    </Container>
  );
}
