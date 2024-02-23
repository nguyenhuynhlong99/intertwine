import {
  Avatar,
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import PostActions from './PostActions';
import { FormEvent, useMemo, useState } from 'react';
import { BROKEN_LINK_IMG, getUser } from '../../utils/userLocalStorage';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import DeletePost from './DeletePost';
import { Reply } from './UserReplies';

interface Props {
  postId: string;
  likes: [string | null];
  replies: Reply[];
  postImg?: string;
  content?: string;
  variant?: string;
  userImg?: string;
  username?: string;
  createdAt?: string;
  userId?: string;
}

export default function PostCard({
  postId,
  likes,
  replies,
  postImg,
  content,
  variant = 'post',
  userImg,
  username,
  createdAt,
  userId,
}: Props) {
  const currentUserId = getUser()?._id;
  const [liked, setLiked] = useState<boolean>(likes.includes(currentUserId));
  const navigate = useNavigate();

  const filteredDuplicateUsers = useMemo(() => {
    const seen = new Set();

    const filteredDups = replies?.filter((reply) => {
      if (seen.size === 3) return;
      const duplicate = seen.has(reply.user._id);
      seen.add(reply.user._id);
      return !duplicate;
    });

    return filteredDups;
  }, [replies]);

  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue('bg.light', 'bg.dark');
  const templateAreas =
    variant === 'postDetail'
      ? `"avatar header"
          "body body"
          "footer footer"`
      : `"avatar header"
        "avatar body"
         "line body"
         "avatarFooter footer"`;

  function navigateToUserPage(e: FormEvent) {
    e.preventDefault();
    navigate(`/${username}`);
  }

  return (
    <>
      <Grid
        templateAreas={templateAreas}
        gridTemplateColumns={'auto 1fr'}
        gridTemplateRows={'auto auto 1fr auto'}
        gap={2}
      >
        <GridItem
          area={'avatar'}
          onClick={navigateToUserPage}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Avatar size={'sm'} src={userImg || BROKEN_LINK_IMG} />
        </GridItem>

        <GridItem
          area={'header'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text fontWeight={600} onClick={navigateToUserPage}>
            {username}
          </Text>

          <Flex alignItems={'center'} gap={1}>
            <Text
              fontWeight={400}
              fontSize={'sm'}
              color={useColorModeValue('gray.light', 'gray.dark')}
            >
              {formatDistanceToNow(new Date(String(createdAt)))}
            </Text>

            {currentUserId === userId && <DeletePost postId={postId} />}
          </Flex>
        </GridItem>

        <GridItem
          area={'body'}
          display={'flex'}
          flexDirection={'column'}
          gap={2}
        >
          <Text>{content}</Text>

          {postImg && (
            <Box>
              <Image
                objectFit="cover"
                src={postImg}
                alt="Cat meme"
                borderRadius={'lg'}
              />
            </Box>
          )}

          <PostActions
            liked={liked}
            setLiked={setLiked}
            postId={postId}
            postedByUsername={String(username)}
          />
        </GridItem>

        {variant !== 'postDetail' && (
          <GridItem
            area={'line'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Box
              h={'full'}
              w="1px"
              bg={colorMode === 'light' ? 'secondary.light' : 'secondary.dark'}
              visibility={replies?.length === 0 ? 'hidden' : 'visible'}
            ></Box>
          </GridItem>
        )}

        {variant !== 'postDetail' && (
          <GridItem
            area={'avatarFooter'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            position={'relative'}
            w={'39px'}
            h={'35px'}
          >
            {filteredDuplicateUsers?.length === 1 && (
              <Flex alignItems={'center'} justifyContent={'center'}>
                <Avatar
                  size={'2xs'}
                  src={filteredDuplicateUsers[0]?.user.profilePic}
                />
              </Flex>
            )}

            {filteredDuplicateUsers?.length === 2 && (
              <Flex alignItems={'center'}>
                <Avatar
                  size={'2xs'}
                  src={filteredDuplicateUsers[0]?.user.profilePic}
                />
                <Avatar
                  border={`1px solid ${bgColor}`}
                  ml={'-2px'}
                  size={'2xs'}
                  src={filteredDuplicateUsers[1]?.user.profilePic}
                />
              </Flex>
            )}

            {filteredDuplicateUsers?.length > 2 && (
              <>
                <Avatar
                  position={'absolute'}
                  top={0}
                  right={0}
                  size={'2xs'}
                  src={filteredDuplicateUsers[0]?.user.profilePic}
                />
                <Avatar
                  position={'absolute'}
                  top={'7px'}
                  left={'0'}
                  size={'2xs'}
                  src={filteredDuplicateUsers[1]?.user.profilePic}
                />
                <Avatar
                  position={'absolute'}
                  bottom={0}
                  left={'16px'}
                  size={'2xs'}
                  src={filteredDuplicateUsers[2]?.user.profilePic}
                />{' '}
              </>
            )}
          </GridItem>
        )}

        <GridItem area={'footer'} display={'flex'} alignItems={'center'}>
          <Flex alignItems={'center'} gap={2}>
            <Text
              color={useColorModeValue('gray.light', 'gray.dark')}
              fontSize={'sm'}
            >
              {replies?.length} replies
            </Text>
            <Box
              as="span"
              w={0.5}
              h={0.5}
              borderRadius={'full'}
              bg={useColorModeValue('gray.light', 'gray.dark')}
            ></Box>
            <Text
              color={useColorModeValue('gray.light', 'gray.dark')}
              fontSize={'sm'}
            >
              {likes.length} likes
            </Text>
          </Flex>
        </GridItem>
      </Grid>
      <Divider
        my={2}
        borderColor={useColorModeValue('secondary.light', 'secondary.dark')}
      />
    </>
  );
}
