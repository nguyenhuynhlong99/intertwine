import { Box } from '@chakra-ui/react';
import PostCard, { Reply } from './PostCard';
import { Link } from 'react-router-dom';

interface Post {
  _id: string;
  likes: [string | null];
  replies: Reply[];
  img: string;
  text: string;
  createdAt: string;
  postedBy: {
    profilePic: string;
    username: string;
    _id: string;
  };
}

interface Props {
  posts: Post[];
}

export default function PostList({ posts }: Props) {
  return (
    <Box as="ul" display={'flex'} flexDirection={'column'} gap={6} mt={4}>
      {posts?.map((post) => (
        <Box key={`post-${post._id}`} as="li">
          <Link to={`/${post?.postedBy?.username}/post/${post?._id}`}>
            <PostCard
              postId={post?._id}
              likes={post?.likes}
              replies={post?.replies}
              postImg={post?.img}
              content={post?.text}
              userImg={post?.postedBy?.profilePic}
              username={post?.postedBy?.username}
              createdAt={post?.createdAt}
              userId={post?.postedBy?._id}
            />
          </Link>
        </Box>
      ))}
    </Box>
  );
}
