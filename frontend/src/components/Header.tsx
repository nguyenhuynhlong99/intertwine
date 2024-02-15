import { Flex, useColorMode, Box, Text } from '@chakra-ui/react';
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
      <Box margin={{ base: 'auto', md: 'unset' }} fontSize={'30px'}>
        <Text
          as="span"
          display={'inline-block'}
          transition={'transform .2s'}
          _hover={{
            transform: 'scale(1.1)',
          }}
          cursor={'pointer'}
        >
          🧵
        </Text>
      </Box>

      <AppNav />

      <Flex alignItems={'center'} gap={1}>
        <button onClick={toggleColorMode} className="icon-container">
          {colorMode === 'light' ? (
            <Moon size={32} color="#2856c3" />
          ) : (
            <Sun size={32} color="#3c6bd7" />
          )}
        </button>
        <Logout />
      </Flex>
    </Flex>
  );
}
