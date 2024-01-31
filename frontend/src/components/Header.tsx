import { Flex, useColorMode } from '@chakra-ui/react';
import { Moon, SignOut, Sun } from '@phosphor-icons/react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      h="74px"
    >
      <div>
        <Link to="/">🧵</Link>
      </div>

      <div>
        <nav>
          <NavLink to="/">🏠</NavLink>
          <NavLink to="/">🔍</NavLink>
          <NavLink to="/">📝</NavLink>
          <NavLink to="/">👤</NavLink>
        </nav>
      </div>

      <Flex alignItems={'center'} gap={1}>
        <button onClick={toggleColorMode} className="icon-container">
          {colorMode === 'light' ? (
            <Moon size={26} color="#2856c3" />
          ) : (
            <Sun size={26} color="#3c6bd7" />
          )}
        </button>
        <button className="icon-container">
          <SignOut size={26} />
        </button>
      </Flex>
    </Flex>
  );
}
