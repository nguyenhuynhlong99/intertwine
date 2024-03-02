import { Box, Flex, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
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
  const replies: IUserReply[] = repliesData?.replies;

  const accentColor = useColorModeValue('accent.light', 'accent.dark');
  const primaryColor = useColorModeValue('primary.light', 'primary.dark');

  if (isLoading) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} color={accentColor} />
      </Flex>
    );
  }

  if (!isLoading && replies.length === 0) {
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
      {replies?.map((reply) => (
        <Box as="li" key={`user-reply-${reply._id}`}>
          <UserReplyLink reply={reply} postId={reply._id} />
        </Box>
      ))}
    </Box>
  );
}
