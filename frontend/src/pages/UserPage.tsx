import UserInfo from '../components/UserInfo';
import { Container } from '@chakra-ui/react';
// import PostCard from '../features/posts/PostCard';
// import { Link } from 'react-router-dom';
import PostList from '../features/posts/PostList';
import { useEffect } from 'react';
import { getPost } from '../services/apiPost';

export default function UserPage() {
  useEffect(() => {
    async function fetchPost() {
      const data = await getPost('65b6f34f2dcd760794e39c90');
      console.log(data);
    }
    fetchPost();
  }, []);

  return (
    <Container maxW="572px">
      <UserInfo />

      <PostList />

      {/* <Link to="/sad/post/1">
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
      </Link> */}
    </Container>
  );
}
