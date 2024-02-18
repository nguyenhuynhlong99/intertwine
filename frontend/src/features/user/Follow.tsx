import { useParams } from 'react-router-dom';
import { useFollow } from './useFollow';
import useShowToast from '../../hooks/useShowToast';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { getUser } from '../../utils/userLocalStorage';

interface Props {
  width?: string;
  user: {
    _id: string;
    followers: string[];
  };
}

export default function Follow({ width, user }: Props) {
  const { username } = useParams();
  const currentUser = getUser();
  const { followUnfollowUser, isUpdating } = useFollow(String(username));

  const following = user?.followers?.includes(String(currentUser?._id));

  const { showToast } = useShowToast();

  const secondaryColor = useColorModeValue('secondary.light', 'secondary.dark');
  const grayColor = useColorModeValue('gray.light', 'gray.dark');

  async function handleFollowUnfollow() {
    followUnfollowUser(user?._id, {
      onSuccess: () => {
        showToast('Success', 'Follow/Unfollow successfully', 'success');
      },
    });
  }

  return (
    <Button
      bg={'transparent'}
      border={'1px solid'}
      borderColor={secondaryColor}
      w={width}
      borderRadius={'10px'}
      _hover={{ bg: 'transparent' }}
      onClick={handleFollowUnfollow}
      isLoading={isUpdating}
      isDisabled={isUpdating}
      color={following ? grayColor : ''}
    >
      {following ? 'Following' : 'Follow'}
    </Button>
  );
}
