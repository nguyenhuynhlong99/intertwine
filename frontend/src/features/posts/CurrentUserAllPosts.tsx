import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from '@chakra-ui/react';
import CurrentUserPosts from './CurrentUserPosts';
import UserReplies from './UserReplies';

export default function CurrentUserAllPosts() {
  const activeTab = useColorModeValue('accent.light', 'accent.dark');
  const grayColor = useColorModeValue('gray.light', 'gray.dark');
  return (
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
      <TabPanels>
        <TabPanel>
          <CurrentUserPosts />
        </TabPanel>

        <TabPanel>
          <UserReplies />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
