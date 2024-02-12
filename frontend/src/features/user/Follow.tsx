import { useParams } from 'react-router-dom';
import { useUser } from '../auth/useUser';
import { useFollow } from './useFollow';
import useShowToast from '../../hooks/useShowToast';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { getUser } from '../../utils/userLocalStorage';

export default function Follow() {
  const { username } = useParams();
  const currentUser = getUser();
  const userData = useUser(String(username));
  const user = userData?.user;
  const { followUnfollowUser, isUpdating } = useFollow(String(username));

  const following = user?.followers?.includes(String(currentUser?._id));

  const { showToast } = useShowToast();

  const secondaryColor = useColorModeValue('secondary.light', 'secondary.dark');

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
      w="full"
      borderRadius={'10px'}
      _hover={{ bg: 'transparent' }}
      onClick={handleFollowUnfollow}
      isLoading={isUpdating}
      isDisabled={isUpdating}
    >
      {following ? 'Unfollow' : 'Follow'}
    </Button>
  );
}
