import { Box } from '@chakra-ui/react';
import PostCard from './PostCard';
import { Link } from 'react-router-dom';

export default function PostList() {
  return (
    <Box as="ul" display={'flex'} flexDirection={'column'} gap={6}>
      <Box as="li">
        <Link to="/sad/post/1">
          <PostCard
            likes={8}
            replies={4}
            postImg="https://blog.cvcavets.com/hs-fs/hubfs/9.jpg?width=334&name=9.jpg"
            content="Summer is for falling in love - Sarah Kang"
          />
        </Link>
      </Box>
      <Box as="li">
        <Link to="/sad/post/1">
          <PostCard
            likes={12}
            replies={8}
            content="Summer is for falling in love - Sarah Kang"
          />
        </Link>
      </Box>
    </Box>
  );
}
