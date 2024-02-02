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

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  const accentColor = useColorModeValue('accent.light', 'accent.dark');
  const secondaryColor = useColorModeValue('secondary.light', 'secondary.dark');

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
        >
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
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
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue('secondary.light', 'secondary.dark')}
                color={useColorModeValue('primary.light', 'primary.dark')}
                _hover={{
                  bg: accentColor,
                  color: secondaryColor,
                }}
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
