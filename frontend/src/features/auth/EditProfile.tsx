import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import useImgPreview from '../../hooks/useImgPreview';
import useShowToast from '../../hooks/useShowToast';
import { useEditProfile } from './useEditProfile';

interface Inputs {
  _id?: string;
  name: string;
  username: string;
  bio: string;
  password: string;
  profilePic?: string;
}

interface Props {
  user: Inputs;
}

export default function EditProfile({ user }: Props) {
  const { editProfile, isUpdating } = useEditProfile(user?.username);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { handleImgChange, imgPreview, resetImgPreview } = useImgPreview();
  const { showToast } = useShowToast();

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<Inputs>({
    defaultValues: user,
  });

  const secondaryColor = useColorModeValue('secondary.light', 'secondary.dark');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.username && data.username.length < 4) {
      showToast('Error', 'Username required at least 4 characters', 'error');
      return;
    }

    if (data.password && data.password.length < 8) {
      showToast('Error', 'Password required at least 8 characters', 'error');
      return;
    }

    data.name = data.name || user.name;
    data.username = data.username || user.username;
    data.bio = data.bio || user.bio;
    data.password = data.password || '';

    editProfile(
      { id: String(user._id), user: { ...data, profilePic: imgPreview } },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  function closeModal() {
    onClose();
    reset(user);
    resetImgPreview();
  }

  useEffect(() => {
    if (user) reset(user);
  }, [user, reset]);

  return (
    <>
      <Button
        bg={'transparent'}
        border={'1px solid'}
        borderColor={secondaryColor}
        w="full"
        borderRadius={'10px'}
        _hover={{ bg: 'transparent' }}
        onClick={onOpen}
      >
        Edit profile
      </Button>

      <Modal
        onClose={closeModal}
        isOpen={isOpen}
        isCentered
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent
          backgroundColor={useColorModeValue('support.light', 'support.dark')}
          rounded={'xl'}
          boxShadow={'lg'}
          py={4}
        >
          <ModalBody
            as={'form'}
            onSubmit={handleSubmit(onSubmit)}
            display={'flex'}
            flexDirection={'column'}
            gap={4}
          >
            <FormControl
              id="avatar"
              display={'flex'}
              alignItems={'center'}
              gap={4}
            >
              <Avatar
                size={'xl'}
                src={String(imgPreview || user?.profilePic)}
              />
              <Button onClick={() => fileRef.current?.click()}>
                Change avatar
              </Button>
              <Input
                type="file"
                hidden
                ref={fileRef}
                onChange={handleImgChange}
              />
            </FormControl>

            <FormControl id="name">
              <FormLabel>Full Name</FormLabel>
              <Input type="text" {...register('name')} />
            </FormControl>

            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input type="text" {...register('username')} />
            </FormControl>

            <FormControl id="bio">
              <FormLabel>Bio</FormLabel>
              <Input type="text" {...register('bio')} />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" {...register('password')} />
            </FormControl>

            <Button
              type="submit"
              w={'full'}
              isLoading={isUpdating}
              isDisabled={isUpdating}
            >
              Done
            </Button>
          </ModalBody>
          {/* <ModalFooter>
            <Button type="submit" w={'full'}>
              Done
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}
