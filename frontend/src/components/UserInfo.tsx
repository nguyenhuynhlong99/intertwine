import {
  Avatar,
  Box,
  Flex,
  Tab,
  TabIndicator,
  TabList,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import EditProfile from '../features/auth/EditProfile';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import Follow from '../features/posts/Follow';
// import { useCurrentUser } from '../features/auth/useCurrentUser';

interface User {
  _id: string;
  name: string;
  bio: string;
  username: string;
  profilePic: string;
  followers: string[];
  following: string[];
}

interface Props {
  user: User;
}

export default function UserInfo({ user }: Props) {
  const currentUser = useRecoilValue(userAtom);
  // const { currentUser: userData } = useCurrentUser();
  // console.log(userData);

  const activeTab = useColorModeValue('accent.light', 'accent.dark');
  const grayColor = useColorModeValue('gray.light', 'gray.dark');

  return (
    <Box marginTop={4} mb={6}>
      <Flex justifyContent={'space-between'}>
        <Box>
          <Text fontSize="2xl" fontWeight={700}>
            {user.name}
          </Text>
          <Flex gap={1} alignItems="center">
            <Text>{user.username}</Text>
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
          <Avatar
            name={user.name}
            src={user.profilePic || ''}
            size={{
              base: 'md',
              md: 'lg',
              lg: 'xl',
            }}
          />
        </Box>
      </Flex>
      <Text my={2}>{user.bio}</Text>
      <Text
        marginBottom={7}
        color={useColorModeValue('gray.light', 'gray.dark')}
      >
        {user.followers.length} followers
      </Text>

      {user.username === currentUser.username ? (
        <EditProfile />
      ) : (
        <Follow user={user} />
      )}

      <Tabs marginTop={4} position="relative">
        <TabList borderColor={grayColor} borderBottom={'1px solid'}>
          <Tab
            fontSize={'sm'}
            fontWeight={700}
            w={'50%'}
            borderBottom={grayColor}
            color={grayColor}
            _selected={{ color: activeTab, backgroundColor: 'transparent' }}
          >
            Posts
          </Tab>
          <Tab
            fontSize={'sm'}
            fontWeight={700}
            w={'50%'}
            borderBottom={grayColor}
            color={grayColor}
            _selected={{ color: activeTab, backgroundColor: 'transparent' }}
          >
            Replies
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg={useColorModeValue('accent.light', 'accent.dark')}
          borderRadius="1px"
        />
      </Tabs>
    </Box>
  );
}
