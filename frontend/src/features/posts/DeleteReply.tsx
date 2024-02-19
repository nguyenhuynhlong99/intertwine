import { Button, useColorModeValue } from '@chakra-ui/react';
import { Trash } from '@phosphor-icons/react';
import useDeleteReply from './useDeleteReply';
import { useParams } from 'react-router-dom';

interface Props {
  replyId: string;
}

export default function DeleteReply({ replyId }: Props) {
  const { pid } = useParams();
  const postId = String(pid);

  const { deleteReply, isDeleting } = useDeleteReply(postId);

  const accentColor = useColorModeValue('accent.light', 'accent.dark');
  const secondaryColor = useColorModeValue('secondary.light', 'secondary.dark');

  function handleDeleteReply() {
    deleteReply({ postId, replyId });
  }

  return (
    <Button
      bgColor={'transparent'}
      padding={2}
      minW={'unset'}
      h={'unset'}
      color={accentColor}
      _hover={{
        bgColor: secondaryColor,
      }}
      borderRadius={'full'}
      className="icon-container"
      fontSize={'xl'}
      onClick={handleDeleteReply}
      isDisabled={isDeleting}
    >
      <Trash />
    </Button>
  );
}
