import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

const categories = ["Web", "Software Engineering", "AI", "Mobile", "DevOps", "Data Science"];

interface PostEditorProps {
  post?: {
    id: number;
    title: string;
    content: string;
    category: string;
    isPremium: boolean;
  };
}

const PostEditor: React.FC<PostEditorProps> = ({ post }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [category, setCategory] = useState(post?.category || '');
  const [isPremium, setIsPremium] = useState(post?.isPremium || false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    import('react-quill/dist/quill.snow.css');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, content, category, isPremium });
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  return (
    <DialogContent className="sm:max-w-[725px] overflow-y-auto max-h-[90vh]">
      <DialogHeader>
        <DialogTitle>{post ? 'Edit Post' : 'Create New Post'}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex-grow">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="premium"
              checked={isPremium}
              onCheckedChange={setIsPremium}
            />
            <Label htmlFor="premium">Premium Content</Label>
          </div>
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          {isMounted && (
            <div className="h-[300px] mb-4">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                className="h-full"
              />
            </div>
          )}
        </div>
      </form>
      <DialogFooter>
        <Button type="submit" onClick={handleSubmit} className="w-full">
          {post ? 'Update' : 'Create'} Post
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default PostEditor;