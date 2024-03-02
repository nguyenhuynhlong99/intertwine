import { useMutation, useQueryClient } from '@tanstack/react-query';
import useShowToast from '../../hooks/useShowToast';
import axios, { AxiosError } from 'axios';
import {
  ReplyBody,
  replyToPost as replyToPostApi,
} from '../../services/apiPost';

interface MutationFnParameter {
  id: string;
  reply: ReplyBody;
}

function useReplyToPost(id: string) {
  const queryClient = useQueryClient();
  const { showToast } = useShowToast();

  const { mutate: replyToPost, isPending } = useMutation({
    mutationFn: ({ id, reply }: MutationFnParameter) =>
      replyToPostApi(id, reply),
    onSuccess: () => {
      showToast('Success', 'Replied to post successfully', 'success');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', id] });
    },
    onError: (err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        showToast('Error', err?.response?.data?.error, 'error');
        return;
      }
      showToast('Error', 'Failed to reply to post', 'error');
    },
  });

  return { replyToPost, isPending };
}

export default useReplyToPost;
