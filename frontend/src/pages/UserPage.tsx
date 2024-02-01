import UserInfo from '../components/UserInfo';
import { Container } from '@chakra-ui/react';
import PostCard from '../features/posts/PostCard';
import { Link } from 'react-router-dom';

export default function UserPage() {
  return (
    <Container maxW="572px">
      <UserInfo />

      <Link to="/sad/post/1">
        <PostCard
          likes={8}
          replies={4}
          postImg="https://blog.cvcavets.com/hs-fs/hubfs/9.jpg?width=334&name=9.jpg"
          content="Summer is for falling in love - Sarah Kang"
        />
      </Link>

      <Link to="/sad/post/1">
        <PostCard
          likes={12}
          replies={8}
          content="Summer is for falling in love - Sarah Kang"
        />
      </Link>
    </Container>
  );
}
