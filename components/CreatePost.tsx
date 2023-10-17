'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
      Form,
      FormControl,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
      addPost,
      cancelEditingPost,
      finishEditingPost,
} from '@/redux/blog.reducer';
import { RootState } from '@/redux/store';
import { Post } from '@/types/blog.type';
import { useEffect, useState } from 'react';

const formSchema = z.object({
      description: z.string(),
      featuredImage: z.string(),
      publishDate: z.string(),
      published: z.boolean(),
      title: z.string(),
      id: z.string(),
});

const initialState: Post = {
      description: '',
      featuredImage: '',
      publishDate: '',
      published: false,
      title: '',
      id: '',
};

export function CreatePost() {
      const dispatch = useDispatch();
      const editingPost = useSelector(
            (state: RootState) => state.blog.editingPost,
      );
      const [formData, setFormData] = useState<Post>(initialState);

      const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                  description: '',
                  featuredImage: '',
                  publishDate: '',
                  published: false,
                  title: '',
                  id: '',
            },
      });

      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
            if (editingPost) {
                  dispatch(finishEditingPost(formData));
            } else {
                  dispatch(addPost(formData));
            }
            setFormData(initialState);
      }

      const handleCancelEditingPost = () => {
            dispatch(cancelEditingPost());
      };

      useEffect(() => {
            setFormData(editingPost || initialState);
      }, [editingPost]);

      return (
            <Form {...form}>
                  <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                  >
                        <FormField
                              control={form.control}
                              name="title"
                              render={({ field }) => (
                                    <FormItem>
                                          <FormLabel>Title</FormLabel>
                                          <FormControl>
                                                <Input
                                                      placeholder="Title"
                                                      value={formData.title}
                                                      onChange={(event) =>
                                                            setFormData(
                                                                  (prev) => ({
                                                                        ...prev,
                                                                        title: event
                                                                              .target
                                                                              .value,
                                                                  }),
                                                            )
                                                      }
                                                />
                                          </FormControl>
                                          <FormMessage />
                                    </FormItem>
                              )}
                        />

                        <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                    <FormItem>
                                          <FormLabel>Description</FormLabel>
                                          <FormControl>
                                                <Input
                                                      placeholder="Description"
                                                      value={
                                                            formData.description
                                                      }
                                                      onChange={(event) =>
                                                            setFormData(
                                                                  (prev) => ({
                                                                        ...prev,
                                                                        description:
                                                                              event
                                                                                    .target
                                                                                    .value,
                                                                  }),
                                                            )
                                                      }
                                                />
                                          </FormControl>
                                          <FormMessage />
                                    </FormItem>
                              )}
                        />

                        <FormField
                              control={form.control}
                              name="featuredImage"
                              render={({ field }) => (
                                    <FormItem>
                                          <FormLabel>Image</FormLabel>
                                          <FormControl>
                                                <Input
                                                      placeholder="Image"
                                                      value={
                                                            formData.featuredImage
                                                      }
                                                      onChange={(event) =>
                                                            setFormData(
                                                                  (prev) => ({
                                                                        ...prev,
                                                                        featuredImage:
                                                                              event
                                                                                    .target
                                                                                    .value,
                                                                  }),
                                                            )
                                                      }
                                                />
                                          </FormControl>
                                          <FormMessage />
                                    </FormItem>
                              )}
                        />

                        <FormField
                              control={form.control}
                              name="publishDate"
                              render={({ field }) => (
                                    <FormItem>
                                          <FormLabel>Date</FormLabel>
                                          <FormControl>
                                                <Input
                                                      placeholder="Date"
                                                      value={formData.publishDate}
                                                      onChange={(event) =>
                                                            setFormData(
                                                                  (prev) => ({
                                                                        ...prev,
                                                                        publishDate: event
                                                                              .target
                                                                              .value,
                                                                  }),
                                                            )
                                                      }
                                                />
                                          </FormControl>
                                          <FormMessage />
                                    </FormItem>
                              )}
                        />

                        <FormField
                              control={form.control}
                              name="published"
                              render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                          <FormControl>
                                                <Checkbox
                                                      onCheckedChange={
                                                            field.onChange
                                                      }
                                                />
                                          </FormControl>
                                          <div className="space-y-1 leading-none">
                                                <FormLabel>Publish</FormLabel>
                                          </div>
                                    </FormItem>
                              )}
                        />

                        {editingPost ? (
                              <Button>Update</Button>
                        ) : (
                              <Button type="submit">Submit</Button>
                        )}

                        {editingPost && (
                              <Button
                                    onClick={handleCancelEditingPost}
                                    className="mx-8 bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 hover:from-black transition-colors duration-150 ease-linear"
                              >
                                    Cancel
                              </Button>
                        )}
                  </form>
            </Form>
      );
}
