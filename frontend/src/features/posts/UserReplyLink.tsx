import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { BROKEN_LINK_IMG } from '../../utils/userLocalStorage';
import { IUserReply } from './UserReplies';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

interface Props {
  reply: IUserReply;
  postId: string;
}

export default function UserReplyLink({ reply, postId }: Props) {
  const { postedBy, replies } = reply;

  const grayColor = useColorModeValue('gray.light', 'gray.dark');
  const secondaryColor = useColorModeValue('secondary.light', 'secondary.dark');

  return (
    <Link to={`/${postedBy.username}/post/${postId}`}>
      <Grid
        templateAreas={`"avatar header"
                            "line body"
                            "line body"`}
        gridTemplateColumns={'auto 1fr'}
        gridTemplateRows={'auto 1fr auto'}
        gap={2}
        pt={2}
      >
        <GridItem area={'avatar'}>
          <Avatar size={'sm'} src={postedBy.profilePic || BROKEN_LINK_IMG} />
        </GridItem>

        <GridItem
          area={'header'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text fontWeight={600}>{postedBy.username}</Text>

          <Flex alignItems={'center'} gap={1}>
            <Text color={useColorModeValue('gray.light', 'gray.dark')}>
              {formatDistanceToNow(new Date(postedBy.createdAt))}
            </Text>
          </Flex>
        </GridItem>

        <GridItem
          area={'body'}
          display={'flex'}
          flexDirection={'column'}
          gap={2}
        >
          <Text>{reply.text}</Text>
        </GridItem>

        <GridItem
          area={'line'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box
            h={'full'}
            w="1px"
            bgColor={useColorModeValue('secondary.light', 'secondary.dark')}
          ></Box>
        </GridItem>
      </Grid>

      {replies?.map((reply, index) => (
        <Grid
          templateAreas={`"avatar header"
                        "line body"
                        "line body"`}
          gridTemplateColumns={'auto 1fr'}
          gridTemplateRows={'auto 1fr auto'}
          gap={2}
          pt={2}
          mb={6}
        >
          <GridItem area={'avatar'}>
            <Avatar size={'sm'} src={reply.userProfilePic || BROKEN_LINK_IMG} />
          </GridItem>

          <GridItem
            area={'header'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Text fontWeight={600}>{reply.username}</Text>

            <Flex alignItems={'center'} gap={1}>
              <Text color={grayColor}>
                {formatDistanceToNow(new Date(reply.createdAt))}
              </Text>

              {/* {currentUser?.username === username && (
            <DeleteReply replyId={replyId} />
          )} */}
            </Flex>
          </GridItem>

          <GridItem
            area={'body'}
            display={'flex'}
            flexDirection={'column'}
            gap={2}
          >
            <Text>{reply.text}</Text>
          </GridItem>

          <GridItem
            area={'line'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            visibility={index === replies?.length - 1 ? 'hidden' : 'visible'}
          >
            <Box h={'full'} w="1px" bgColor={secondaryColor}></Box>
          </GridItem>
        </Grid>
      ))}
    </Link>
  );
}
