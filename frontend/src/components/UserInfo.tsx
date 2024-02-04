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

export default function UserInfo() {
  const activeTab = useColorModeValue('accent.light', 'accent.dark');
  // const secondaryColor = useColorModeValue('secondary.light', 'secondary.dark');
  const grayColor = useColorModeValue('gray.light', 'gray.dark');

  return (
    <Box marginTop={4} mb={6}>
      <Flex justifyContent={'space-between'}>
        <Box>
          <Text fontSize="2xl" fontWeight={700}>
            Damian
          </Text>
          <Flex gap={1} alignItems="center">
            <Text>_itsbeenalongday</Text>
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
            name="Damian"
            src="https://www.the-sun.com/wp-content/uploads/sites/6/2023/10/www-instagram-com-monkeycatluna-hl-851711797.jpg"
            size={{
              base: 'md',
              md: 'lg',
              lg: 'xl',
            }}
          />
        </Box>
      </Flex>
      <Text my={2}>Probably just here to share my favorite songs🎧</Text>
      <Text
        marginBottom={7}
        color={useColorModeValue('gray.light', 'gray.dark')}
      >
        0 followers
      </Text>

      <EditProfile />

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
