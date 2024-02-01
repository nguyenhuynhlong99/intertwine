import { Flex, useColorMode, Link as ChakraLink, Box } from '@chakra-ui/react';
import { Moon, SignOut, Sun } from '@phosphor-icons/react';
import { NavLink as ReactRouterNavLink } from 'react-router-dom';
import AppNav from './AppNav';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      h="74px"
    >
      <Box margin={{ base: 'auto', md: 'unset' }}>
        <ChakraLink
          as={ReactRouterNavLink}
          to="/"
          _hover={{
            border: 'none',
          }}
        >
          🧵
        </ChakraLink>
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
        <button className="icon-container">
          <SignOut
            size={26}
            color={colorMode === 'light' ? '#2856c3' : '#3c6bd7'}
          />
        </button>
      </Flex>
    </Flex>
  );
}
