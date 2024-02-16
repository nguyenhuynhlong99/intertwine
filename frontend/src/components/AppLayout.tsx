import { Outlet } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';
import Header from './Header';
import AppNav from './AppNav';

const AppLayout = () => {
  return (
    <Container maxW="1230px" position={'relative'}>
      <Header />

      <Box pt={'80px'}>
        <Container maxW="572px">
          <Outlet />
        </Container>
      </Box>

      <Box
        display={{
          base: 'block',
          md: 'none',
        }}
        position={'fixed'}
        bottom={0}
        left={0}
        right={0}
      >
        <AppNav />
      </Box>
    </Container>
  );
};

export default AppLayout;
