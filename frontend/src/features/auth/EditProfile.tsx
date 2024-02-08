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
import { useRecoilState } from 'recoil';
import userAtom from '../../atoms/userAtom';
import { useRef } from 'react';
import useImgPreview from '../../hooks/useImgPreview';
import useShowToast from '../../hooks/useShowToast';
import { updateProfile } from '../../services/apiUser';

interface Inputs {
  name: string;
  username: string;
  bio: string;
  password: string;
}

export default function EditProfile() {
  const [user, setUser] = useRecoilState(userAtom);
  const { _id: userId, ...userValues } = user;
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
    defaultValues: userValues,
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

    data.name = data.name || userValues.name;
    data.username = data.username || userValues.username;
    data.bio = data.bio || userValues.bio;
    data.password = data.password || '';

    try {
      const userData = await updateProfile(userId, {
        ...data,
        profilePic: imgPreview,
      });

      if (userData?.error) {
        showToast('Failed to update profile', userData?.error, 'error');
        return;
      }

      showToast('Success', 'Updated profile successfully', 'success');
      setUser(userData);
      localStorage.setItem('intertwine-user', JSON.stringify(userData));
      reset(userData);
      //   console.log(data);
    } catch (error) {
      showToast('Error', 'Failed to update profile', 'error');
    }
  };

  function closeModal() {
    onClose();
    reset();
    resetImgPreview();
  }

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

      <Modal onClose={closeModal} isOpen={isOpen} isCentered>
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
              <Avatar size={'xl'} src={imgPreview || user.profilePic} />
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

            <Button type="submit" w={'full'}>
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
