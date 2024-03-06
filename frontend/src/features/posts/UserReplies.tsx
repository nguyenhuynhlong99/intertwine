import {
  Box,
  Divider,
  Flex,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useReplies } from './useReplies';
import UserReplyLink from './UserReplyLink';

export type Reply = {
  _id: string;
  createdAt: string;
  text: string;
  user: {
    _id: string;
    name: string;
    profilePic: string;
    username: string;
  };
};

export interface IUserReply {
  _id: string;
  text: string;
  postedBy: {
    createdAt: string;
    username: string;
    profilePic: string;
  };

  replies: Reply[];
}

export default function UserReplies() {
  const repliesData = useReplies();
  const isLoading = repliesData?.isLoading;
  const posts: IUserReply[] = repliesData?.posts;

  const accentColor = useColorModeValue('accent.light', 'accent.dark');
  const primaryColor = useColorModeValue('primary.light', 'primary.dark');
  const secondaryColor = useColorModeValue('secondary.light', 'secondary.dark');

  if (isLoading) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} color={accentColor} />
      </Flex>
    );
  }

  if (!isLoading && posts.length === 0) {
    return (
      <Text
        textAlign={'center'}
        color={primaryColor}
        fontSize={'lg'}
        fontWeight={700}
      >
        No replies yet.
      </Text>
    );
  }

  return (
    <Box as="ul">
      {posts?.map((post, index) => (
        <Box
          as="li"
          key={`user-reply-${post._id}`}
          mb={index === posts.length - 1 ? 10 : 4}
        >
          <UserReplyLink post={post} postId={post._id} />

          {index !== posts.length - 1 && (
            <Divider my={2} borderColor={secondaryColor} />
          )}
        </Box>
      ))}
    </Box>
  );
}
