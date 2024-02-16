import { Box, Grid, useColorModeValue } from '@chakra-ui/react';
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

  const bgColor = useColorModeValue(
    'rgba(229, 235, 250, 0.75)',
    'rgba(5, 11, 26, 0.75)'
  );
  // const accentColor = useColorModeValue('accent.light', 'accent.dark');
  // const secondaryColor = useColorModeValue('secondary.light', 'secondary.dark');
  const isPostPage = location.pathname.includes('post');
  const templateColumns = isPostPage ? 'repeat(5, 20%)' : 'repeat(4, 25%)';
  return (
    <Box
      h={'74px'}
      w={'100vw'}
      maxWidth={{ md: '440px', xl: '620px' }}
      bgColor={bgColor}
      backdropFilter={'blur(16px)'}
      zIndex={10}
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

        <ReactRouterNavLink to={'/'} className="navLink">
          {({ isActive }) => <House weight={isActive ? 'fill' : 'regular'} />}
        </ReactRouterNavLink>

        <ReactRouterNavLink to={'/search'} className="navLink">
          {({ isActive }) => (
            <MagnifyingGlass weight={isActive ? 'fill' : 'regular'} />
          )}
        </ReactRouterNavLink>

        <CreatePost />

        <ReactRouterNavLink to={`/${currentUsername}`} className="navLink">
          {({ isActive }) => <User weight={isActive ? 'fill' : 'regular'} />}
        </ReactRouterNavLink>
      </Grid>
    </Box>
  );
}
