import {
  Avatar,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { BROKEN_LINK_IMG } from '../../utils/userLocalStorage';
import { formatDistanceToNow } from 'date-fns';
import DeleteReply from './DeleteReply';
import { useCurrentUser } from '../auth/useCurrentUser';
import { useNavigate } from 'react-router-dom';

interface Props {
  username: string;
  avatar?: string;
  img?: string;
  content: string;
  createdAt: string;
  replyId: string;
}

export default function Reply({
  username,
  avatar,
  img,
  content,
  createdAt,
  replyId,
}: Props) {
  const { data: currentUser } = useCurrentUser();
  const navigate = useNavigate();

  function navigateToUserPage(username: string) {
    navigate(`/${username}`);
  }

  return (
    <>
      <Grid
        templateAreas={`"avatar header"
                          "avatar body"
                          ". body"`}
        gridTemplateColumns={'auto 1fr'}
        gridTemplateRows={'auto 1fr auto'}
        gap={2}
        pt={2}
      >
        <GridItem
          area={'avatar'}
          cursor={'pointer'}
          onClick={() => navigateToUserPage(username)}
        >
          <Avatar size={'sm'} src={avatar || BROKEN_LINK_IMG} />
        </GridItem>

        <GridItem
          area={'header'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text
            fontWeight={600}
            cursor={'pointer'}
            onClick={() => navigateToUserPage(username)}
          >
            {username}
          </Text>

          <Flex alignItems={'center'} gap={1}>
            <Text color={useColorModeValue('gray.light', 'gray.dark')}>
              {formatDistanceToNow(new Date(String(createdAt)))}
            </Text>

            {currentUser?.username === username && (
              <DeleteReply replyId={replyId} />
            )}
          </Flex>
        </GridItem>

        <GridItem
          area={'body'}
          display={'flex'}
          flexDirection={'column'}
          gap={2}
        >
          <Text>{content}</Text>

          {img && <Image borderRadius={'10px'} src={img} />}
        </GridItem>
      </Grid>
      <Divider
        my={2}
        borderColor={useColorModeValue('secondary.light', 'secondary.dark')}
      />
    </>
  );
}
