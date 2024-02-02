import { Container } from '@chakra-ui/react';
import PostCard from '../features/posts/PostCard';
import Reply from '../features/posts/Reply';

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

      <Reply
        username="itsbeenmeowday"
        avatar="https://i.chzbgr.com/full/7929533696/hB519D262/no-i-havent-had-too-much"
        likes={12}
        img="https://www.rd.com/wp-content/uploads/2023/04/Hilarious-Cat-Memes-3.jpg?fit=700%2C700"
        content="Hello friend, It's meow!"
      />

      <Reply
        username="garfieldthecat"
        avatar="https://pbs.twimg.com/media/BVGbRq3CcAEgSy6.jpg:large"
        likes={24}
        img="https://pbs.twimg.com/media/EqTlmUCWMAEgJev.jpg"
        content="You know me!"
      />
    </Container>
  );
}
