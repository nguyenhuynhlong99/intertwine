import { Flex, useColorModeValue } from '@chakra-ui/react';
import { ChatCircle, Heart } from '@phosphor-icons/react';
import { SetStateAction } from 'react';
// import { useState } from 'react';

interface Props {
  like: boolean;
  setLike: React.Dispatch<SetStateAction<boolean>>;
}

export default function PostActions({ like, setLike }: Props) {
  return (
    <Flex
      onClick={(e) => e.preventDefault()}
      alignItems={'center'}
      gap={1}
      fontSize={'26px'}
      color={useColorModeValue('accent.light', 'accent.dark')}
    >
      <button
        className="icon-container"
        onClick={() => setLike((like) => !like)}
      >
        {/* color="rgb(255, 48, 64)" */}
        {like ? <Heart weight="fill" /> : <Heart />}
      </button>
      <button className="icon-container">
        <ChatCircle />
      </button>
      {/* <button className="icon-container">
        <Heart />
      </button>
      <button className="icon-container">
        <Heart />
      </button> */}
    </Flex>
  );
}
