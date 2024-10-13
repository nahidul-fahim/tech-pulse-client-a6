/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, ThumbsUp, ThumbsDown, ArrowRight } from "lucide-react";
import { useGetAllPostsQuery } from '@/redux/features/post/postApi';
import Image from 'next/image';
import { categories } from '@/static/allCategories';

const NewsFeed: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');

    const { data, isLoading } = useGetAllPostsQuery({
        searchTerm: searchTerm,
        category: category
    })

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (value: string) => {
        setCategory(value);
    };

    if (isLoading) {
        return <div>Loading...</div>
    }

    const allPosts = data?.data?.posts;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-primary mb-4">Tech Tips & Tricks</h1>
                <p className="text-xl text-body mb-6">Discover the latest tech insights and expert advice</p>
                <Button className="w-full sm:w-auto mb-4 bg-primary text-white hover:bg-primary/90">Create New Post</Button>
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
                            {
                                categories?.map((category: string, idx: number) =>
                                    <SelectItem key={idx} value={category}>{category}</SelectItem>
                                )
                            }
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {allPosts?.map((post: any) => (
                        <Card key={post._id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <Image width={350} height={200} src={post.featuredImg} alt={post?.title} className="w-full h-48 object-cover" />
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-primary">{post?.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-body mb-4">{post?.description?.substring(0, 100)}...</p>
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
            )}
        </div>
    );
};

export default NewsFeed;