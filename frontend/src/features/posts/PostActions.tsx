import { Flex, useColorModeValue } from '@chakra-ui/react';
import { ChatCircle, Heart } from '@phosphor-icons/react';
import { SetStateAction } from 'react';
import useLikePost from './useLikePost';

interface Props {
  postId: string;
  liked: boolean;
  setLiked: React.Dispatch<SetStateAction<boolean>>;
}

export default function PostActions({ liked, setLiked, postId }: Props) {
  const { likePost } = useLikePost(postId);

  function handleLikePost() {
    setLiked((liked) => !liked);
    likePost(postId, {
      onSuccess: (data) => {
        console.log(data);
      },
    });
  }

  return (
    <Flex
      onClick={(e) => e.preventDefault()}
      alignItems={'center'}
      gap={1}
      fontSize={'26px'}
      color={useColorModeValue('accent.light', 'accent.dark')}
    >
      <button className="icon-container" onClick={handleLikePost}>
        {/* color="rgb(255, 48, 64)" */}
        {liked ? <Heart weight="fill" /> : <Heart />}
      </button>
      <button className="icon-container">
        <ChatCircle />
      </button>
      {/* <button className="icon-container">
        <Heart />
      </button>
      <button className="icon-container">
        <Heart />
      </button> */}
    </Flex>
  );
}
