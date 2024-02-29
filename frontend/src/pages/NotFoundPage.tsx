import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const primaryColor = useColorModeValue('primary.light', 'primary.dark');
  const accentColor = useColorModeValue('accent.light', 'accent.dark');

  return (
    <Flex as="main" h={'100vh'} alignItems={'center'} justifyContent={'center'}>
      <Box textAlign={'center'} px={3}>
        <Heading size={'lg'} mb={3} color={primaryColor}>
          Sorry, this page isn't available
        </Heading>
        <Text color={useColorModeValue('gray.light', 'gray.dark')} mb={4}>
          The link you followed may be broken, or the page may have been
          removed.
        </Text>
        <Button
          color={primaryColor}
          border={'1px solid'}
          borderColor={primaryColor}
          bgColor="transparent"
          _hover={{
            bgColor: 'transparent',
            color: accentColor,
          }}
          onClick={() => navigate('/')}
        >
          Back
        </Button>
      </Box>
    </Flex>
  );
}
