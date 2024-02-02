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

type Inputs = {
  username: string;
  fullName: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const accentColor = useColorModeValue('accent.light', 'accent.dark');

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
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
                  isInvalid={errors.fullName?.message ? true : false}
                >
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="text"
                    {...register('fullName', {
                      required: 'This field is required',
                      minLength: {
                        value: 8,
                        message: 'Minimum 8',
                      },
                    })}
                  />

                  <InputErrorMessage message={errors.fullName?.message} />
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
                        value: 8,
                        message: 'Minimum 8',
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
                  })}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
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
