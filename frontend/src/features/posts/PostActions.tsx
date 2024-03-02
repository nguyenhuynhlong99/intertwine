import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Heart } from '@phosphor-icons/react';
import { SetStateAction } from 'react';
import useLikePost from './useLikePost';
import ReplyToPost from './ReplyToPost';

interface Props {
  postId: string;
  postedByUsername: string;
  liked: boolean;
  setLiked: React.Dispatch<SetStateAction<boolean>>;
}

export default function PostActions({
  liked,
  setLiked,
  postId,
  postedByUsername,
}: Props) {
  const { likePost, isPending: isLiking } = useLikePost(postId);

  function handleLikePost() {
    setLiked((liked) => !liked);
    likePost(postId);
  }

  return (
    <Flex
      onClick={(e) => e.preventDefault()}
      alignItems={'center'}
      gap={1}
      fontSize={'26px'}
      color={useColorModeValue('accent.light', 'accent.dark')}
    >
      <button
        className="icon-container"
        onClick={handleLikePost}
        disabled={isLiking}
      >
        {/* color="rgb(255, 48, 64)" */}
        {liked ? <Heart weight="fill" /> : <Heart />}
      </button>

      <ReplyToPost postId={postId} postedByUsername={postedByUsername} />
      {/* <button className="icon-container">
        <Heart />
      </button>
      <button className="icon-container">
        <Heart />
      </button> */}
    </Flex>
  );
}
