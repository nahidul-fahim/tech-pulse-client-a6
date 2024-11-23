/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, ArrowRight, Menu } from "lucide-react";
import { useGetAllPostsQuery } from '@/redux/features/post/postApi';
import Image from 'next/image';
import { categories } from '@/static/allCategories';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Dialog, DialogTrigger } from '../ui/dialog';
import PostEditor from '../postEditor/PostEditor';
import Loading from '../loading/Loading';
import { Skeleton } from '../ui/skeleton';

const NewsFeed: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(1);
    const [allPosts, setAllPosts] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
                setAllPosts(data?.data?.posts);
            } else {
                updatePosts(data?.data?.posts);
            }
            setHasMore(data?.data?.totalPages > page);
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
        setSidebarOpen(false);
    };

    const loadMore = () => {
        if (!isFetching && hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    if (isLoading && page === 1) {
        return <Loading />
    }

    return (
        <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row">
            {/* Mobile sidebar toggle */}
            <button
                className="md:hidden mb-4 p-2 bg-primary text-white rounded-md"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <Menu />
            </button>

            {/* Sidebar */}
            <div className={`w-full md:w-48 md:mr-7 lg:w-64 lg:mr-8 ${sidebarOpen ? 'block' : 'hidden md:block'}`}>
                <h2 className="text-xl font-bold mb-4">Categories</h2>
                <ul>
                    <li
                        className={`cursor-pointer px-4 py-2 rounded-md mb-2 ${category === ''
                            ? 'bg-primary text-white'
                            : 'hover:bg-secondary hover:text-white'
                            }`}
                        onClick={() => handleCategoryChange('')}
                    >
                        All Categories
                    </li>
                    {categories?.map((cat: string, idx: number) => (
                        <li
                            key={idx}
                            className={`cursor-pointer px-4 py-2 rounded-md mb-2 ${category === cat
                                ? 'bg-primary text-white'
                                : 'hover:bg-secondary hover:text-white'
                                }`}
                            onClick={() => handleCategoryChange(cat)}
                        >
                            {cat}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main content */}
            <div className="flex-1">
                <div className="mb-8">
                    <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4'>
                        <Input
                            type="text"
                            placeholder="Search posts..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full sm:w-64"
                        />
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Create New Post</Button>
                            </DialogTrigger>
                            <PostEditor post={null} refetch={refetch} />
                        </Dialog>
                    </div>
                </div>

                <InfiniteScroll
                    dataLength={allPosts.length}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={
                        isLoading && <div className="flex justify-center items-center h-20 my-6">
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-20 w-20 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[400px]" />
                                    <Skeleton className="h-4 w-[350px]" />
                                </div>
                            </div>
                        </div>
                    }
                >
                    <div className="space-y-6">
                        {
                            allPosts.length === 0 ? (
                                <div className="text-center">
                                    <p className="text-gray-500">No posts found.</p>
                                </div>
                            )
                                :
                                <>
                                    {allPosts.map((post: any) => (
                                        <Card key={post._id} className="shadow-none overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                            <CardContent className="p-4">
                                                <div className="flex flex-col sm:flex-row">
                                                    <Image width={100} height={100} src={post.featuredImg} alt={post?.title} className="w-full sm:w-24 h-40 sm:h-24 object-cover rounded-md mb-4 sm:mb-0 sm:mr-4" />
                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-semibold text-primary mb-2">{post?.title}</h3>
                                                        <p
                                                            className="text-body mb-2"
                                                            dangerouslySetInnerHTML={{
                                                                __html: post?.description
                                                                    .replace(/<[^>]*>/g, ' ')
                                                                    .replace(/\s+/g, ' ')
                                                                    .trim()
                                                                    .split(' ')
                                                                    .slice(0, 30)
                                                                    .join(' ') + '...',
                                                            }}
                                                        ></p>
                                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 sm:mt-0">
                                                            <div className="flex items-center space-x-4 text-black mb-2 sm:mb-0">
                                                                <span className="flex items-center">
                                                                    <ThumbsUp className="mr-1 h-4 w-4" /> {post?.upvoteCount}
                                                                </span>
                                                                <span className="flex items-center">
                                                                    <ThumbsDown className="mr-1 h-4 w-4" /> {post?.downvoteCount}
                                                                </span>
                                                                <span className="text-sm font-medium text-secondary bg-secondary/10 px-2 py-1 rounded">{post?.category}</span>
                                                                {
                                                                    post?.isPremium && <span className="text-sm font-medium bg-orange-100 px-2 py-1 rounded text-orange-600">Premium</span>
                                                                }

                                                            </div>
                                                            <Link href={`/post/${post?._id}`} passHref>
                                                                <Button variant="outline" size="sm" className="flex items-center">
                                                                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </>
                        }
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default NewsFeed;