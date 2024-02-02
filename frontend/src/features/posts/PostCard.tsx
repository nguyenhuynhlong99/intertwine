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
import { useState } from 'react';

interface Props {
  likes: number;
  replies?: number;
  postImg?: string;
  content?: string;
  variant?: string;
}

export default function PostCard({
  likes,
  replies,
  postImg,
  content,
  variant = 'post',
}: Props) {
  const [liked, setLiked] = useState<boolean>(false);
  const { colorMode } = useColorMode();
  const templateAreas =
    variant === 'postPage'
      ? `"avatar header"
          "body body"
          "footer footer"`
      : `"avatar header"
        "avatar body"
         "line body"
         "avatarFooter footer"`;

  return (
    <>
      <Grid
        templateAreas={templateAreas}
        gridTemplateColumns={'auto 1fr'}
        gridTemplateRows={'auto auto 1fr auto'}
        gap={2}
      >
        <GridItem area={'avatar'}>
          <Avatar
            size={'sm'}
            src="https://www.the-sun.com/wp-content/uploads/sites/6/2023/10/www-instagram-com-monkeycatluna-hl-851711797.jpg"
          />
        </GridItem>

        <GridItem
          area={'header'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text fontWeight={600}>_itsbeenalongday</Text>

          <Text color={useColorModeValue('gray.light', 'gray.dark')}>1d</Text>
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

          <PostActions liked={liked} setLiked={setLiked} />
        </GridItem>

        {variant !== 'postPage' && (
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
              my={2}
            ></Box>
          </GridItem>
        )}

        {variant !== 'postPage' && (
          <GridItem
            area={'avatarFooter'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            position={'relative'}
            w={'39px'}
            h={'35px'}
          >
            <Avatar
              position={'absolute'}
              top={0}
              right={0}
              size={'2xs'}
              src="https://www.the-sun.com/wp-content/uploads/sites/6/2023/10/www-instagram-com-monkeycatluna-hl-851711797.jpg"
            />
            <Avatar
              position={'absolute'}
              top={'7px'}
              left={'0'}
              size={'2xs'}
              src="https://www.the-sun.com/wp-content/uploads/sites/6/2023/10/www-instagram-com-monkeycatluna-hl-851711797.jpg"
            />
            <Avatar
              position={'absolute'}
              bottom={0}
              left={'16px'}
              size={'2xs'}
              src="https://www.the-sun.com/wp-content/uploads/sites/6/2023/10/www-instagram-com-monkeycatluna-hl-851711797.jpg"
            />
          </GridItem>
        )}

        <GridItem area={'footer'}>
          <Flex alignItems={'center'} gap={2}>
            <Text
              color={useColorModeValue('gray.light', 'gray.dark')}
              fontSize={'sm'}
            >
              {replies} replies
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
              {likes + (liked ? 1 : 0)} likes
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
