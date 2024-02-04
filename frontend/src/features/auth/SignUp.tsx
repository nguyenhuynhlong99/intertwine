import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import authScreenAtom from '../../atoms/authAtom';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputErrorMessage from '../../components/InputErrorMessage';
import { signup } from '../../services/apiAuth';
import useShowToast from '../../hooks/useShowToast';
import userAtom from '../../atoms/userAtom';

type Inputs = {
  username: string;
  name: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);
  const { showToast } = useShowToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const accentColor = useColorModeValue('accent.light', 'accent.dark');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const userData = await signup(data);
      if (userData?.error) {
        showToast('Failed to sign up', userData?.error, 'error');
        return;
      }

      localStorage.setItem('intertwine-user', JSON.stringify(userData));
      setUser(userData);
      setAuthScreen('login');
    } catch (error) {
      showToast('Error', 'Failed to sign up', 'error');
      console.log(error);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      fontFamily={'inherit'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading
            fontSize={'4xl'}
            textAlign={'center'}
            color={useColorModeValue('primary.light', 'primary.dark')}
          >
            Sign up
          </Heading>
        </Stack>
        <Box
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          rounded={'lg'}
          bg={useColorModeValue('support.light', 'support.dark')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={1}>
            <HStack>
              <Box>
                <FormControl
                  id="fullName"
                  isRequired
                  isInvalid={errors.name?.message ? true : false}
                >
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="text"
                    {...register('name', {
                      required: 'This field is required',
                    })}
                  />

                  <InputErrorMessage message={errors.name?.message} />
                </FormControl>
              </Box>
              <Box>
                <FormControl
                  id="username"
                  isRequired
                  isInvalid={errors.username?.message ? true : false}
                >
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    {...register('username', {
                      required: 'This field is required',
                      minLength: {
                        value: 4,
                        message: 'Required at least 4 characters',
                      },
                    })}
                  />
                  <InputErrorMessage message={errors.username?.message} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl
              id="email"
              isRequired
              isInvalid={errors.email?.message ? true : false}
            >
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                {...register('email', {
                  required: 'This field is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please provide a valid email address',
                  },
                })}
              />
              <InputErrorMessage message={errors.email?.message} />
            </FormControl>
            <FormControl
              id="password"
              isRequired
              isInvalid={errors.password?.message ? true : false}
            >
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'This field is required',
                    minLength: {
                      value: 8,
                      message: 'Required at least 8 characters',
                    },
                  })}
                />
                <InputRightElement h={'full'}>
                  <Button
                    bg={'transparent'}
                    _hover={{
                      bg: 'transparent',
                    }}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                    px={3}
                  >
                    {showPassword ? <Eye /> : <EyeSlash />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <InputErrorMessage message={errors.password?.message} />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue('secondary.light', 'secondary.dark')}
                color={useColorModeValue('primary.light', 'primary.dark')}
                _hover={{
                  bg: accentColor,
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?{' '}
                <Link
                  as={'button'}
                  color={useColorModeValue('accent.light', 'accent.dark')}
                  onClick={() => setAuthScreen('login')}
                >
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
