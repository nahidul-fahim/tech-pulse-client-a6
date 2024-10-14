/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import 'react-quill/dist/quill.snow.css';
import { FieldValues } from 'react-hook-form';
import RHFormProvider from '../form/RHFromProvider';
import RHInput from '../form/RHInput';
import RHSelect from '../form/RHSelect';
import RHFileSelect from '../form/RHFileSelect';
import RHQuillEditor from '../form/RHQuillEditor';
import { useCreateNewPostMutation, useUpdatePostMutation } from '@/redux/features/post/postApi';
import { toast } from 'sonner';
import useToken from '@/hooks/useToken';
import { TSinglePost } from '@/types/allTypes';
import { categories } from '@/static/allCategories';

const PostEditor = ({ post = null, refetch }: { post: TSinglePost | null, refetch: () => void }) => {
  const [featuredImgPreview, setFeaturedImgPreview] = useState<string | null>(post?.featuredImg || null);
  const [featuredImg, setFeaturedImg] = useState<File | null>(null);
  const token = useToken();
  const [isMounted, setIsMounted] = useState(false);
  const [isPremium, setIsPremium] = useState(post?.isPremium || false);
  const [createNewPost, { isLoading }] = useCreateNewPostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // image file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImg(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImgPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // submit the data
  const onSubmit = async (data: FieldValues) => {
    if (!token) {
      return toast.warning('Please sign in', { duration: 2000 });
    }
    const toastId = toast.loading('Creating post...');
    try {
      const formData = new FormData();
      if (featuredImg) {
        formData.append('file', featuredImg);
      }
      const postData = {
        title: data?.title as string,
        description: data?.content as any,
        category: data?.category as string,
        isPremium: isPremium as boolean
      }
      formData.append('data', JSON.stringify(postData));
      if (post) {
        await updatePost({ token: token as string, id: post._id as string, postInfo: formData }).unwrap();
        refetch();
        toast.success('Post updated successfully', { id: toastId, duration: 2000 });
      } else {
        await createNewPost({ token: token as string, postInfo: formData }).unwrap();
        refetch();
        toast.success('Post created successfully', { id: toastId, duration: 2000 });
      }
      // reset form
      setFeaturedImgPreview(null);
      setFeaturedImg(null);
      setIsPremium(false);

    } catch (error: any) {
      const errorMessage = error?.data?.message || 'An error occurred';
      toast.error(errorMessage, { id: toastId, duration: 2000 });
    }
  };

  return (
    <DialogContent className="sm:max-w-[725px] overflow-y-auto max-h-[90vh]">
      <DialogHeader>
        <DialogTitle>{post ? 'Edit Post' : 'Create New Post'}</DialogTitle>
      </DialogHeader>

      <RHFormProvider
        onSubmit={onSubmit}
        defaultValues={{
          title: post?.title || '',
          content: post?.description || '',
          category: post?.category || '',
          isPremium: post?.isPremium || false,
          featuredImage: post?.featuredImg || null,
        }}
      >
        <div className="space-y-4">
          <RHInput
            type="text"
            name="title"
            label="Title"
            placeholder="Enter post title"
          />
          <RHSelect
            name="category"
            options={categories}
            placeholder="Select a category"
            label="Category"
          />

          <div className="flex flex-col items-start justify-start space-y-2">
            <label htmlFor="">Post type</label>
            <div className='flex items-center space-x-2'>
              <Button
                variant={!isPremium ? 'secondary' : 'outline'}
                size="sm"
                type='button'
                onClick={() => setIsPremium(false)}>
                Free
              </Button>

              <Button
                variant={isPremium ? 'secondary' : 'outline'}
                size="sm"
                type='button'
                onClick={() => setIsPremium(true)}>
                Premium
              </Button>
            </div>
          </div>

          {/* Featured Image Section */}
          <RHFileSelect
            name="featuredImage"
            label="Featured Image"
            onChange={handleImageChange}
          />
          {featuredImgPreview && (
            <div className="mt-2">
              <Image
                src={featuredImgPreview}
                alt="Preview"
                height={128}
                width={256}
                className="h-32 w-auto object-cover mt-2"
              />
            </div>
          )}

          {isMounted && (
            <RHQuillEditor
              name="content"
              label="Content"
              content={post?.description || ''}
            />
          )}
        </div>

        <DialogFooter className='mt-3'>
          <Button type="submit" className="w-full" disabled={isLoading || isUpdating}>
            {post ? 'Update' : 'Create'} Post
          </Button>
        </DialogFooter>
      </RHFormProvider>
    </DialogContent>
  );
};

export default PostEditor;
