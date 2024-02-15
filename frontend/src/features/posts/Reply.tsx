// import { useState } from 'react';
import {
  Avatar,
  // Box,
  Divider,
  Grid,
  GridItem,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// import PostActions from './PostActions';
// import { Heart } from '@phosphor-icons/react';
import { BROKEN_LINK_IMG } from '../../utils/userLocalStorage';

interface Props {
  //   replies?: number;
  username: string;
  avatar?: string;
  // likes: number;
  img?: string;
  content: string;
}

export default function Reply({
  // replies,
  username,
  avatar,
  // likes,
  img,
  content,
}: Props) {
  // const [liked, setLiked] = useState<boolean>(false);

  return (
    <>
      <Grid
        templateAreas={`"avatar header"
                          "avatar body"
                          ". body"`}
        gridTemplateColumns={'auto 1fr'}
        gridTemplateRows={'auto auto 1fr auto'}
        gap={2}
        pt={2}
      >
        <GridItem area={'avatar'}>
          <Avatar size={'sm'} src={avatar || BROKEN_LINK_IMG} />
        </GridItem>

        <GridItem
          area={'header'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text fontWeight={600}>{username}</Text>

          <Text color={useColorModeValue('gray.light', 'gray.dark')} hidden>
            1d
          </Text>
        </GridItem>

        <GridItem
          area={'body'}
          display={'flex'}
          flexDirection={'column'}
          gap={2}
        >
          <Text>{content}</Text>

          {img && <Image borderRadius={'10px'} src={img} />}

          {/* <PostActions liked={liked} setLiked={setLiked} /> */}
          {/* <Box
            fontSize={'26px'}
            color={useColorModeValue('accent.light', 'accent.dark')}
          >
            <button
              className="icon-container"
              onClick={() => setLiked((liked) => !liked)}
            >
              {liked ? <Heart weight="fill" /> : <Heart />}
            </button>
          </Box> */}
        </GridItem>
        {/* <GridItem area={'footer'}>
          <Box>
            <Text
              color={useColorModeValue('gray.light', 'gray.dark')}
              fontSize={'sm'}
            >
              {replies} replies
            </Text>
            <Text
              color={useColorModeValue('gray.light', 'gray.dark')}
              fontSize={'sm'}
            >
              {likes + (liked ? 1 : 0)} likes
            </Text>
          </Box>
        </GridItem> */}
      </Grid>
      <Divider
        my={2}
        borderColor={useColorModeValue('secondary.light', 'secondary.dark')}
      />
    </>
  );
}
