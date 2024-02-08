import { Button, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import useShowToast from '../../hooks/useShowToast';
import { followUnfollow } from '../../services/apiUser';
import { useRecoilValue } from 'recoil';
import userAtom from '../../atoms/userAtom';

interface User {
  _id: string;
  name: string;
  bio: string;
  username: string;
  profilePic: string;
  followers: string[];
  following: string[];
}

interface Props {
  user: User;
}

export default function Follow({ user }: Props) {
  const currentUser = useRecoilValue(userAtom);
  const [following, setFollowing] = useState<boolean>(
    user.followers.includes(String(currentUser._id))
  );
  const { showToast } = useShowToast();

  const secondaryColor = useColorModeValue('secondary.light', 'secondary.dark');

  async function handleFollowUnfollow() {
    try {
      const data = await followUnfollow(user._id);
      if (data?.error) {
        showToast('Error', data.error, 'error');
        return;
      }

      if (following) {
        user.followers.pop();
      } else {
        user.followers.push(currentUser._id);
      }

      setFollowing((following) => !following);
      console.log(data);
    } catch (error) {
      showToast('error', 'Failed to follow/unfollow', 'error');
    }
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
    >
      {following ? 'Unfollow' : 'Follow'}
    </Button>
  );
}
