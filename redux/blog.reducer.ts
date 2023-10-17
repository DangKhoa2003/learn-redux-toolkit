'use client'

import { Post } from '@/types/blog.type';
import {
      createReducer,
      createAction,
      current,
      PayloadAction,
      nanoid,
} from '@reduxjs/toolkit';
import { initalPostList } from './constants';

interface BlogState {
      postList: Post[];
      editingPost: Post | null;
}

const initalState: BlogState = {
      postList: initalPostList,
      editingPost: null,
};

export const addPost = createAction(
      'addPost',
      function (post: Omit<Post, 'id'>) {
            return {
                  payload: {
                        ...post,
                        id: nanoid(),
                  },
            };
      },
);
export const deletePost = createAction<string>('deletePost');
export const startEditingPost = createAction<string>('startEditingPost');
export const cancelEditingPost = createAction('cancelEditingPost');
export const finishEditingPost = createAction<Post>('finishEditingPost');

const blogReducer = createReducer(initalState, (builder) => {
      builder
            .addCase(addPost, (state, action) => {
                  const post = action.payload;
                  state.postList.push(post);
            })
            .addCase(deletePost, (state, action) => {
                  console.log('start', current(state));
                  const postId = action.payload;
                  const foundPostIndex = state.postList.findIndex(
                        (post) => post.id === postId,
                  );
                  if (foundPostIndex !== -1) {
                        state.postList.splice(foundPostIndex, 1);
                  }
                  console.log('finish', current(state));
            })
            .addCase(startEditingPost, (state, action) => {
                  const postId = action.payload;
                  const foundPost =
                        state.postList.find((post) => post.id === postId) ||
                        null;
                  state.editingPost = foundPost;
            })
            .addCase(cancelEditingPost, (state) => {
                  state.editingPost = null;
            })
            .addCase(finishEditingPost, (state, action) => {
                  const postId = action.payload.id;
                  state.postList.some((post, index) => {
                        if (post.id === postId) {
                              state.postList[index] = action.payload;
                              return true;
                        }
                        return false;
                  });
                  state.editingPost = null;
            })
            .addMatcher(
                  (action) => action.type.includes('cancel'),
                  (state, action) => {
                        console.log(current(state));
                  },
            );
});

export default blogReducer;
