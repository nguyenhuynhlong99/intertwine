import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
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

// import { login } from '../../services/apiAuth';
// import userAtom from '../../atoms/userAtom';
import useLogin from './useLogin';

interface Inputs {
  username: string;
  password: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  // const setUser = useSetRecoilState(userAtom);
  const { login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const accentColor = useColorModeValue('accent.light', 'accent.dark');
  const secondaryColor = useColorModeValue('secondary.light', 'secondary.dark');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    login(data, {
      onSuccess: () => {
        reset();
      },
    });
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
            Log in
          </Heading>
        </Stack>
        <Box
          w={{
            base: 'full',
            sm: '400px',
          }}
          rounded={'lg'}
          bg={useColorModeValue('support.light', 'support.dark')}
          boxShadow={'lg'}
          p={8}
          as="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={4}>
            <FormControl
              id="username"
              isRequired
              isInvalid={errors?.username?.message ? true : false}
            >
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                {...register('username', {
                  required: 'This field is required',
                })}
                isDisabled={isPending}
              />
              <InputErrorMessage message={errors?.username?.message} />
            </FormControl>
            <FormControl
              id="password"
              isRequired
              isInvalid={errors?.password?.message ? true : false}
            >
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'This field is required',
                  })}
                  isDisabled={isPending}
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
              <InputErrorMessage message={errors?.password?.message} />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                size="lg"
                bg={useColorModeValue('secondary.light', 'secondary.dark')}
                color={useColorModeValue('primary.light', 'primary.dark')}
                _hover={{
                  bg: accentColor,
                  color: secondaryColor,
                }}
                isLoading={isPending}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Don't have an account?{' '}
                <Link
                  as={'button'}
                  color={useColorModeValue('accent.light', 'accent.dark')}
                  onClick={() => setAuthScreen('signup')}
                >
                  Sign up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
