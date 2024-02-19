import {
  Avatar,
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { BROKEN_LINK_IMG } from '../../utils/userLocalStorage';
import { UserSearch } from './SearchUser';
import Follow from './Follow';

interface Props {
  user: UserSearch;
}

export default function UserSearchCard({ user }: Props) {
  return (
    <>
      <Grid as={'li'} templateColumns={'auto 1fr'} gap={3} pt={3}>
        <GridItem>
          <Avatar size={'sm'} src={user.profilePic || BROKEN_LINK_IMG} />
        </GridItem>

        <GridItem>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Box>
              <Text fontWeight={600}>{user.username}</Text>
              <Text color={useColorModeValue('gray.light', 'gray.dark')}>
                {user.name}
              </Text>
            </Box>

            <Follow user={user} />
          </Flex>

          <Text>{user.followers.length} followers</Text>
        </GridItem>
      </Grid>
      <Divider
        my={2}
        borderColor={useColorModeValue('secondary.light', 'secondary.dark')}
      />
    </>
  );
}
