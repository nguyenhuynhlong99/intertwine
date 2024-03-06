import { useMutation, useQueryClient } from '@tanstack/react-query';
import useShowToast from '../../hooks/useShowToast';
import axios from 'axios';
import { updateProfile } from '../../services/apiUser';
import { useNavigate } from 'react-router-dom';

export interface EditProfileUserInputs {
  name: string;
  username: string;
  bio: string;
  password: string;
  profilePic: string | ArrayBuffer | null;
}

interface MutationFnParameter {
  id: string;
  user: EditProfileUserInputs;
}

export function useEditProfile(username: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useShowToast();

  const { mutate: editProfile, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, user }: MutationFnParameter) => updateProfile(id, user),
    onSuccess: (data) => {
      if (data.username !== username) {
        navigate(`/${data.username}`);
      }
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['user', username] });
      showToast('Success', 'Edit profile successfully', 'success');
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        showToast('Error', err?.response?.data?.error, 'error');
        return;
      }
      showToast('Error', 'Failed to edit profile', 'error');
    },
  });
  return { editProfile, isUpdating };
}
