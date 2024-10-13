/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, ThumbsUp, ThumbsDown, ArrowRight } from "lucide-react";
import { useGetAllPostsQuery } from '@/redux/features/post/postApi';
import Image from 'next/image';
import { categories } from '@/static/allCategories';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Dialog, DialogTrigger } from '../ui/dialog';
import PostEditor from '../postEditor/PostEditor';

const NewsFeed: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(1);
    const [allPosts, setAllPosts] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const limit = 6;

    const { data, isLoading, isFetching, refetch } = useGetAllPostsQuery({
        searchTerm: searchTerm,
        category: category,
        page: page,
        limit: limit
    });

    const updatePosts = useCallback((newPosts: any[]) => {
        setAllPosts(prevPosts => {
            const updatedPosts = [...prevPosts];
            newPosts.forEach(newPost => {
                const existingIndex = updatedPosts.findIndex(p => p._id === newPost._id);
                if (existingIndex >= 0) {
                    updatedPosts[existingIndex] = newPost;
                } else {
                    updatedPosts.push(newPost);
                }
            });
            return updatedPosts;
        });
    }, []);

    useEffect(() => {
        if (data?.data?.posts) {
            if (page === 1) {
                setAllPosts(data.data.posts);
            } else {
                updatePosts(data.data.posts);
            }
            setHasMore(data.data.totalPages > page);
        }
    }, [data, page, updatePosts]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setPage(1);
        setAllPosts([]);
        setHasMore(true);
    };

    const handleCategoryChange = (value: string) => {
        setCategory(value);
        setPage(1);
        setAllPosts([]);
        setHasMore(true);
    };

    const loadMore = () => {
        if (!isFetching && hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    if (isLoading && page === 1) {
        return <div>Loading...</div>
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="mb-8">
                <div className='w-full flex justify-end mb-4'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Create New Post</Button>
                        </DialogTrigger>
                        <PostEditor post={null} refetch={refetch} />
                    </Dialog>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <Input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="flex-grow"
                    />
                    <Select value={category} onValueChange={handleCategoryChange}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories?.map((category: string, idx: number) =>
                                <SelectItem key={idx} value={category}>{category}</SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <InfiniteScroll
                dataLength={allPosts.length}
                next={loadMore}
                hasMore={hasMore}
                loader={
                    <div className="flex justify-center items-center h-20">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                }
            >
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {allPosts.map((post: any) => (
                        <Card key={post._id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
                            <Image width={350} height={200} src={post.featuredImg} alt={post?.title} className="w-full h-48 object-cover" />
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-primary">{post?.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-secondary space-x-4">
                                    <span className="flex items-center">
                                        <ThumbsUp className="mr-1 h-4 w-4" /> {post?.upvoteCount}
                                    </span>
                                    <span className="flex items-center">
                                        <ThumbsDown className="mr-1 h-4 w-4" /> {post?.downvoteCount}
                                    </span>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center">
                                <span className="text-sm font-medium text-secondary">{post?.category}</span>
                                <Link href={`/post/${post?._id}`} passHref>
                                    <Button variant="outline" size="sm" className="flex items-center">
                                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default NewsFeed;