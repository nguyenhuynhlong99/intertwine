import { Flex, Spinner, useColorModeValue } from '@chakra-ui/react';
import Reply from '../features/posts/Reply';
import { useParams } from 'react-router-dom';
import usePost from '../features/posts/usePost';
import PostCard from '../features/posts/PostCard';
import { Reply as IReply } from '../features/posts/UserReplies';

export default function PostPage() {
  const { pid: postId } = useParams();

  const postData = usePost(String(postId));
  const post = postData?.post;
  const replies: IReply[] = post?.replies;

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
          username={reply?.user.username}
          avatar={reply?.user.profilePic}
          content={reply?.text}
          createdAt={reply?.createdAt}
          replyId={reply?._id}
        />
      ))}
    </>
  );
}
