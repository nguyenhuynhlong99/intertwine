import { Avatar, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import EditProfile from '../features/auth/EditProfile';
import Follow from '../features/user/Follow';
import { useUser } from '../features/auth/useUser';
import { useParams } from 'react-router-dom';
import { BROKEN_LINK_IMG } from '../utils/userLocalStorage';
import { useCurrentUser } from '../features/auth/useCurrentUser';

export default function UserInfo() {
  const { username } = useParams();
  const { data: currentUser } = useCurrentUser();
  const userData = useUser(String(username));
  const user = userData?.user;

  return (
    <Box marginTop={4} mb={6}>
      <Flex justifyContent={'space-between'}>
        <Box>
          <Text fontSize="2xl" fontWeight={700}>
            {user?.name}
          </Text>
          <Flex gap={1} alignItems="center">
            <Text>{user?.username}</Text>
            <Text
              fontSize="xs"
              bg={useColorModeValue('support.light', 'support.dark')}
              p={1}
              borderRadius={'full'}
            >
              intertwine.net
            </Text>
          </Flex>
        </Box>
        <Box>
          {user?.profilePic ? (
            <Avatar
              name={user?.name}
              src={user?.profilePic}
              size={{
                base: 'md',
                md: 'lg',
                lg: 'xl',
              }}
            />
          ) : (
            <Avatar
              src={BROKEN_LINK_IMG}
              size={{
                base: 'md',
                md: 'lg',
                lg: 'xl',
              }}
            />
          )}
        </Box>
      </Flex>
      <Text my={2}>{user?.bio}</Text>
      <Text
        marginBottom={7}
        color={useColorModeValue('gray.light', 'gray.dark')}
      >
        {user?.followers?.length} followers
      </Text>
      {username === currentUser?.username && <EditProfile user={user} />}
      {username !== currentUser?.username && (
        <Follow width="full" user={user} />
      )}
    </Box>
  );
}
