import { Flex, Spinner, useColorModeValue } from '@chakra-ui/react';
// import PostCard from '../features/posts/PostCard';
import Reply from '../features/posts/Reply';
import { useParams } from 'react-router-dom';
import usePost from '../features/posts/usePost';
import PostCard from '../features/posts/PostCard';

interface Reply {
  _id: string;
  username: string;
  userProfilePic: string;
  text: string;
}

export default function PostPage() {
  const { pid: postId } = useParams();

  const postData = usePost(String(postId));
  const post = postData?.post;
  const replies: Reply[] = post?.replies;

  const accentColor = useColorModeValue('accent.light', 'accent.dark');

  if (postData?.isPending) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} color={accentColor} />
      </Flex>
    );
  }

  if (!postData?.isPending && !post) {
    return null;
  }

  console.log(post);

  return (
    <>
      <PostCard
        variant="postDetail"
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

      {replies?.map((reply) => (
        <Reply
          key={reply._id}
          username={reply?.username}
          avatar={reply?.userProfilePic}
          content={reply?.text}
        />
      ))}

      {/* <Reply
        username="garfieldthecat"
        avatar="https://pbs.twimg.com/media/BVGbRq3CcAEgSy6.jpg:large"
        likes={24}
        img="https://pbs.twimg.com/media/EqTlmUCWMAEgJev.jpg"
        content="You know me!"
      /> */}
    </>
  );
}
