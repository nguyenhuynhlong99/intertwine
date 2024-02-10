import {
  Box,
  Grid,
  Link as ChakraLink,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { ArrowLeft } from '@phosphor-icons/react';
import {
  NavLink as ReactRouterNavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { getUser } from '../utils/userLocalStorage';

export default function AppNav() {
  const currentUsername = getUser()?.username;
  const location = useLocation();
  const navigate = useNavigate();
  console.log(currentUsername);

  const secondaryColor = useColorModeValue('secondary.light', 'secondary.dark');
  const isPostPage = location.pathname.includes('post');
  const templateColumns = isPostPage ? 'repeat(5, 20%)' : 'repeat(4, 25%)';
  return (
    <Box
      h={'full'}
      w={'100vw'}
      maxWidth={{ md: '440px', xl: '620px' }}
      display={{ base: 'none', md: 'block' }}
    >
      <Grid
        as="nav"
        alignItems={'center'}
        templateColumns={templateColumns}
        h={'full'}
      >
        {isPostPage && (
          <Box
            as="button"
            className="icon-container"
            w={50}
            h={50}
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={26} />
          </Box>
        )}

        <ChakraLink
          as={ReactRouterNavLink}
          to="/"
          h={'full'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          borderRadius={'10px'}
          fontSize={'26px'}
          _hover={{
            bg: secondaryColor,
          }}
        >
          🏠
        </ChakraLink>
        <ChakraLink
          as={ReactRouterNavLink}
          to="/"
          h={'full'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          borderRadius={'10px'}
          fontSize={'26px'}
          _hover={{
            bg: secondaryColor,
          }}
        >
          🔍
        </ChakraLink>
        <Button
          display={'block'}
          bg={'transparent'}
          h={'full'}
          textAlign={'center'}
          borderRadius={'10px'}
          fontSize={'26px'}
          _hover={{
            bg: secondaryColor,
          }}
        >
          📝
        </Button>
        <ChakraLink
          as={ReactRouterNavLink}
          to={`/${currentUsername}`}
          h={'full'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          borderRadius={'10px'}
          fontSize={'26px'}
          _hover={{
            bg: secondaryColor,
          }}
        >
          👤
        </ChakraLink>
      </Grid>
    </Box>
  );
}
