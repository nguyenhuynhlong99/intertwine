import {
  Input,
  InputGroup,
  InputLeftElement,
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

  const grayColor = useColorModeValue('gray.light', 'gray.dark');

  const debouncedChangeHandler = useMemo(
    () => debounce(handleOnChange, 500),
    []
  );

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  console.log(users);

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
        />
      </InputGroup>

      <UserSearchList users={users} />
    </>
  );
}
