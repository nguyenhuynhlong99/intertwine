import { UseToastOptions, useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

function useShowToast() {
  const toast = useToast();
  const showToast = useCallback(
    (title: string, description: string, status: UseToastOptions['status']) => {
      toast({
        title,
        description,
        status,
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    },
    [toast]
  );
  return { showToast };
}

export default useShowToast;
