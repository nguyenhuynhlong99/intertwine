import {
  Avatar,
  Button,
  //   Flex,
  FormControl,
  //   FormLabel,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { ChatCircle } from '@phosphor-icons/react';
import { BROKEN_LINK_IMG } from '../../utils/userLocalStorage';
import useReplyToPost from './useReplyToPost';
import { useState } from 'react';
import { useCurrentUser } from '../auth/useCurrentUser';

interface Props {
  postId: string;
  postedByUsername: string;
}

export default function ReplyToPost({ postId, postedByUsername }: Props) {
  const { data: currentUser } = useCurrentUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { replyToPost, isPending } = useReplyToPost(postId);
  const [content, setContent] = useState<string>('');

  function handleReplyToPost() {
    replyToPost(
      { id: postId, reply: { text: content } },
      {
        onSuccess: () => {
          setContent('');
          onClose();
        },
      }
    );
  }

  return (
    <>
      <button className="icon-container" onClick={onOpen}>
        <ChatCircle />
      </button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered preserveScrollBarGap>
        <ModalOverlay />
        <ModalContent
          backgroundColor={useColorModeValue('support.light', 'support.dark')}
          rounded={'xl'}
          boxShadow={'lg'}
          w={'full'}
          maxW="550px"
        >
          <ModalCloseButton />
          <ModalBody pb={6} as={'form'} onSubmit={handleReplyToPost}>
            <Grid gridTemplateColumns={'auto 1fr'} gap={3}>
              <GridItem>
                <Avatar
                  size={'sm'}
                  src={currentUser?.profilePic || BROKEN_LINK_IMG}
                />
              </GridItem>

              <GridItem>
                <Text mb={1}>{currentUser?.username}</Text>

                <FormControl id="content">
                  <Input
                    as={'textarea'}
                    w={'full'}
                    minH={'60px'}
                    resize={'none'}
                    bgColor={'transparent'}
                    placeholder={`Reply to ${postedByUsername}...`}
                    p={'10px'}
                    _focusVisible={{
                      outline: 'none',
                    }}
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    isDisabled={isPending}
                  />
                </FormControl>

                {/* <Text
                  mt={1}
                  fontSize={'small'}
                  textAlign={'right'}
                  color={useColorModeValue('gray.light', 'gray.dark')}
                >
                  <Text as={'span'} color={accentColor}>
                    {remainingCharacters}
                  </Text>{' '}
                  / {MAX_CHAR}
                </Text> */}

                <Button
                  display={'block'}
                  type="submit"
                  borderRadius={'full'}
                  mt={4}
                  ml={'auto'}
                  isLoading={isPending}
                  isDisabled={isPending}
                >
                  Post
                </Button>
              </GridItem>
            </Grid>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}
