import {
  useColorMode,
  Box,
  Text,
  useColorModeValue,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { Moon, Sun } from '@phosphor-icons/react';
import AppNav from './AppNav';
import Logout from '../features/auth/Logout';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue(
    'rgba(229, 235, 250, 0.75)',
    'rgba(5, 11, 26, 0.75)'
  );

  return (
    <Grid
      as="header"
      templateColumns={'1fr auto 1fr'}
      alignItems={'center'}
      h="74px"
      maxW={'inherit'}
      w={'full'}
      bgColor={bgColor}
      backdropFilter={'blur(16px)'}
      zIndex={10}
      px={4}
      position={'fixed'}
      top={0}
      left={0}
      right={0}
      margin={'auto'}
    >
      <GridItem fontSize={'30px'}>
        <Text
          as="span"
          display={'inline-block'}
          transition={'transform .2s'}
          _hover={{
            transform: 'scale(1.1)',
          }}
          cursor={'pointer'}
          visibility={{
            base: 'hidden',
            md: 'visible',
          }}
        >
          🧵
        </Text>
      </GridItem>

      <GridItem>
        <Box
          display={{
            base: 'none',
            md: 'block',
          }}
        >
          <AppNav />
        </Box>
        <Text
          fontSize={'30px'}
          as="span"
          transition={'transform .2s'}
          _hover={{
            transform: 'scale(1.1)',
          }}
          cursor={'pointer'}
          display={{
            base: 'inline-block',
            md: 'none',
          }}
        >
          🧵
        </Text>
      </GridItem>

      <GridItem
        display={'flex'}
        justifyContent={'flex-end'}
        alignItems={'center'}
        gap={1}
      >
        <button onClick={toggleColorMode} className="icon-container">
          {colorMode === 'light' ? (
            <Moon size={'32px'} color="#2856c3" />
          ) : (
            <Sun size={'32px'} color="#3c6bd7" />
          )}
        </button>
        <Logout />
      </GridItem>
    </Grid>
  );
}
