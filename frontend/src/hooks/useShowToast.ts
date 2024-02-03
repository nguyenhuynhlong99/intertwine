import { UseToastOptions, useToast } from '@chakra-ui/react';

function useShowToast() {
  const toast = useToast();
  const showToast = (
    title: string,
    description: string,
    status: UseToastOptions['status']
  ) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  };
  return { showToast };
}

export default useShowToast;
