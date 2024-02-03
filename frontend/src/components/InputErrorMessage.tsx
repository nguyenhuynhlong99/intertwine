import { Text } from '@chakra-ui/react';

interface Props {
  message?: string;
}

export default function InputErrorMessage({ message }: Props) {
  return (
    <Text pt={1} color={message ? 'red.300' : 'transparent'} fontSize={'xs'}>
      {message ? message : 'There always an error '}
    </Text>
  );
}
