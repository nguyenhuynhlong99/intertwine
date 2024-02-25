import { useMutation, useQueryClient } from '@tanstack/react-query';
import useShowToast from '../../hooks/useShowToast';
import axios from 'axios';
import { updateProfile } from '../../services/apiUser';
import { saveUser } from '../../utils/userLocalStorage';

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
  const { showToast } = useShowToast();

  const { mutate: editProfile, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, user }: MutationFnParameter) => updateProfile(id, user),
    onSuccess: (data) => {
      console.log(data);
      saveUser(data?.user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['user', username] });
      showToast('Success', 'Edit profile successfully', 'success');
    },
    onError: (err) => {
      console.log(err);
      if (axios.isAxiosError(err)) {
        showToast('Error', err?.response?.data?.error, 'error');
        return;
      }
      showToast('Error', 'Failed to edit profile', 'error');
    },
  });
  return { editProfile, isUpdating };
}
