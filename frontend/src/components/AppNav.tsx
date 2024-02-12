import {
  Box,
  Grid,
  Link as ChakraLink,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowLeft, MagnifyingGlass, User } from '@phosphor-icons/react';
import {
  NavLink as ReactRouterNavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { getUser } from '../utils/userLocalStorage';
import CreatePost from '../features/posts/CreatePost';
import { House } from '@phosphor-icons/react';

export default function AppNav() {
  const currentUsername = getUser()?.username;
  const location = useLocation();
  const navigate = useNavigate();
  console.log(currentUsername);

  const accentColor = useColorModeValue('accent.light', 'accent.dark');
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
          color={accentColor}
        >
          <House />
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
          color={accentColor}
        >
          <MagnifyingGlass />
        </ChakraLink>
        <CreatePost />
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
          color={accentColor}
        >
          <User />
        </ChakraLink>
      </Grid>
    </Box>
  );
}
