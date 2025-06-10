import {
  useQuery, 
  useMutation,
  useQueryClient,
  useInfiniteQuery
} from '@tanstack/react-query';
import { createPost, createUserAccount, signOutAccount } from '../appwrite/api';
import { INewPost, INewUser } from '@/types';
import { signInAccount } from '@/lib/appwrite/api';

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn:  signOutAccount
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: 'getRecentPosts'
      })
    }
  })
}