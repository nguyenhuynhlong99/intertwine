import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Trash } from '@phosphor-icons/react';
import useDeleteReply from './useDeleteReply';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';

interface Props {
  replyId: string;
}

export default function DeleteReply({ replyId }: Props) {
  const { pid } = useParams();
  const postId = String(pid);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const { deleteReply, isDeleting } = useDeleteReply(postId);

  const accentColor = useColorModeValue('accent.light', 'accent.dark');
  const secondaryColor = useColorModeValue('secondary.light', 'secondary.dark');

  function handleDeleteReply() {
    deleteReply({ postId, replyId });
    onClose();
  }

  return (
    <>
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
        onClick={(e) => {
          e.preventDefault();
          onOpen();
        }}
        isDisabled={isDeleting}
      >
        <Trash />
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
        preserveScrollBarGap
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            backgroundColor={useColorModeValue('support.light', 'support.dark')}
          >
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              textAlign={'center'}
            >
              Delete Reply
            </AlertDialogHeader>

            <AlertDialogBody
              textAlign={'center'}
              color={useColorModeValue('gray.light', 'gray.dark')}
            >
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} isDisabled={isDeleting}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDeleteReply}
                ml={3}
                isLoading={isDeleting}
                isDisabled={isDeleting}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
