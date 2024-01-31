import { Outlet } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import Header from './Header';

const AppLayout = () => {
  return (
    <Container maxW="1230px">
      <Header />
      <Outlet />
    </Container>
  );
};

export default AppLayout;
