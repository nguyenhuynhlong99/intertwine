import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import debounce from 'lodash.debounce';
import { ChangeEvent, useMemo, useState } from 'react';
import { useUsers } from './useUsers';
import UserSearchList from './UserSearchList';

export interface UserSearch {
  username: string;
  name: string;
  profilePic: string;
  followers: string[];
  _id: string;
}

export default function SearchUser() {
  const [search, setSearch] = useState<string | undefined>();

  const usersData = useUsers({ username: search });
  const users: UserSearch[] = usersData?.data?.users;
  const isLoading = usersData?.isLoading;

  const grayColor = useColorModeValue('gray.light', 'gray.dark');
  const accentColor = useColorModeValue('accent.light', 'accent.dark');

  const debouncedChangeHandler = useMemo(
    () => debounce(handleOnChange, 500),
    []
  );

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <>
      <InputGroup
        h={{
          base: '44px',
          md: '60px',
        }}
        mb={2}
      >
        <InputLeftElement
          pointerEvents={'none'}
          h={'full'}
          pl={4}
          color={grayColor}
          fontSize={'lg'}
        >
          <MagnifyingGlass />
        </InputLeftElement>
        <Input
          h={'full'}
          type="text"
          placeholder="Search"
          fontSize={'md'}
          borderRadius={20}
          onChange={debouncedChangeHandler}
          autoComplete="username"
          name="username"
        />
      </InputGroup>

      {isLoading ? (
        <Flex justifyContent={'center'}>
          <Spinner size={'xl'} color={accentColor} />
        </Flex>
      ) : (
        <UserSearchList users={users} />
      )}
    </>
  );
}
