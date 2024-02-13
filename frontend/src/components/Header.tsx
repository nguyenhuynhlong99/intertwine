import { Flex, useColorMode, Box } from '@chakra-ui/react';
import { Moon, Sun } from '@phosphor-icons/react';
// import { NavLink as ReactRouterNavLink } from 'react-router-dom';
import AppNav from './AppNav';
import Logout from '../features/auth/Logout';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      h="74px"
    >
      <Box
        as="span"
        margin={{ base: 'auto', md: 'unset' }}
        transition={'transform .2s ease'}
        _hover={{
          transform: 'scale(1.3)',
        }}
        cursor={'pointer'}
      >
        🧵
      </Box>

      <AppNav />

      <Flex alignItems={'center'} gap={1}>
        <button onClick={toggleColorMode} className="icon-container">
          {colorMode === 'light' ? (
            <Moon size={26} color="#2856c3" />
          ) : (
            <Sun size={26} color="#3c6bd7" />
          )}
        </button>
        <Logout />
      </Flex>
    </Flex>
  );
}
