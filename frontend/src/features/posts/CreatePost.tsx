import {
  Avatar,
  Box,
  Button,
  CloseButton,
  FormControl,
  //   FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  //   Input,
  Modal,
  ModalBody,
  ModalContent,
  // ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  //   Textarea,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Images, NotePencil } from '@phosphor-icons/react';
import useImgPreview from '../../hooks/useImgPreview';
import { ChangeEvent, useRef, useState } from 'react';
import useCreatePost from './useCreatePost';
import { BROKEN_LINK_IMG, getUser } from '../../utils/userLocalStorage';

const MAX_CHAR = 500;

export default function CreatePost() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = getUser();
  const { handleImgChange, imgPreview, resetImgPreview } = useImgPreview();
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [postContent, setPostContent] = useState<string>('');
  const [remainingCharacters, setRemainingCharacters] =
    useState<number>(MAX_CHAR);
  const { createPost, isCreating } = useCreatePost();

  const secondaryColor = useColorModeValue('secondary.light', 'secondary.dark');
  const accentColor = useColorModeValue('accent.light', 'accent.dark');
  const grayColor = useColorModeValue('gray.light', 'gray.dark');

  function handleContentChange(e: ChangeEvent<HTMLInputElement>) {
    const inputContent = e.target.value;

    if (inputContent.length > MAX_CHAR) {
      const truncatedContent = inputContent.slice(0, MAX_CHAR);
      setPostContent(truncatedContent);
      setRemainingCharacters(0);
    } else {
      setPostContent(inputContent);
      setRemainingCharacters(MAX_CHAR - inputContent.length);
    }
  }

  function handleCreatePost() {
    createPost(
      { postedBy: String(currentUser._id), text: postContent, img: imgPreview },
      {
        onSuccess: () => {
          handleCloseModal();
        },
      }
    );
  }

  function handleCloseModal() {
    setPostContent('');
    setRemainingCharacters(MAX_CHAR);
    resetImgPreview();
    onClose();
  }

  return (
    <>
      <Button
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        bg={'transparent'}
        h={'full'}
        borderRadius={'10px'}
        fontSize={'26px'}
        color={accentColor}
        _hover={{
          bg: secondaryColor,
        }}
        onClick={onOpen}
      >
        <NotePencil />
      </Button>

      <Modal onClose={handleCloseModal} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          backgroundColor={useColorModeValue('support.light', 'support.dark')}
          rounded={'xl'}
          boxShadow={'lg'}
          w={'full'}
          maxW="600px"
          py={4}
        >
          <ModalHeader textAlign={'center'}>New Post</ModalHeader>

          <ModalBody as={'form'} onSubmit={handleCreatePost}>
            <Grid gridTemplateColumns={'auto 1fr'} gap={2}>
              <GridItem>
                <Avatar size={'sm'} src={BROKEN_LINK_IMG} />
              </GridItem>

              <GridItem>
                <Text mb={1}>_itsbeenalongday</Text>

                <FormControl id="content">
                  <Input
                    as={'textarea'}
                    w={'full'}
                    minH={'60px'}
                    resize={'none'}
                    bgColor={'transparent'}
                    placeholder="Start a post..."
                    p={'10px'}
                    _focusVisible={{
                      outline: 'none',
                    }}
                    onChange={handleContentChange}
                    value={postContent}
                    isDisabled={isCreating}
                  />
                </FormControl>

                <Text
                  mt={1}
                  fontSize={'small'}
                  textAlign={'right'}
                  color={useColorModeValue('gray.light', 'gray.dark')}
                >
                  <Text as={'span'} color={accentColor}>
                    {remainingCharacters}
                  </Text>{' '}
                  / {MAX_CHAR}
                </Text>

                <Input
                  type="file"
                  hidden
                  ref={imgRef}
                  onChange={handleImgChange}
                />

                <Button
                  p={'0'}
                  fontSize={'25px'}
                  background={'none'}
                  _hover={{ background: 'none' }}
                  onClick={() => imgRef.current?.click()}
                  ml={'auto'}
                  isDisabled={isCreating}
                >
                  <Images />
                </Button>

                {imgPreview && (
                  <Box my={4} position={'relative'}>
                    <Image
                      borderRadius={'lg'}
                      src={String(imgPreview)}
                      alt="Selected img"
                    />
                    <CloseButton
                      bgColor={grayColor}
                      position={'absolute'}
                      top={2}
                      right={2}
                      onClick={resetImgPreview}
                    />
                  </Box>
                )}

                <Button
                  display={'block'}
                  type="submit"
                  borderRadius={'full'}
                  isLoading={isCreating}
                  isDisabled={isCreating}
                  ml={'auto'}
                >
                  Post
                </Button>
              </GridItem>
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
