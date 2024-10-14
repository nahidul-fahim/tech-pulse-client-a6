/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from 'react';
import useToken from '@/hooks/useToken';
import { useDeletePostMutation, useGetAllPostsQuery } from "@/redux/features/post/postApi";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useState } from "react";
import { TSinglePost } from "@/types/allTypes";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "../ui/alert-dialog";
import { toast } from "sonner";
import { categories } from "@/static/allCategories";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Loading from '../loading/Loading';


export const ContentManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [isPremium, setIsPremium] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;
    const token = useToken();
    const { data, isLoading, refetch } = useGetAllPostsQuery({
        token: token as string,
        searchTerm: searchTerm,
        category: category,
        isPremium: isPremium,
        page: currentPage,
        limit: postsPerPage,
    });
    const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

    // handle delete post
    const handleDeletePost = async (postId: string) => {
        const toastId = toast.loading("Deleting post...");
        try {
            await deletePost({ token: token as string, id: postId as string });
            toast.success("Post deleted successfully.", { id: toastId, duration: 2000 });
            refetch();
        } catch (error: any) {
            const errorMessage = error?.data?.message || 'Failed to delete';
            toast.error(errorMessage, { id: toastId, duration: 2000 });
        }
    };

    if (isLoading) {
        return <Loading />
    }

    const allPosts = data?.data?.posts;
    const totalPages = data?.data?.totalPages;
    const pagesArray = Array.from({ length: totalPages }, (_, index) => index);

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>My Posts</CardTitle>
                <CardDescription>Manage your posts here.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
                <div className="flex flex-col lg:flex-row justify-start lg:justify-between mb-4 gap-4">
                    <Input
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full lg:w-1/3"
                    />
                    {/* category */}
                    <Select value={category} onValueChange={(value) => setCategory(value)}>
                        <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {
                                categories?.map((category: string) => (
                                    <SelectItem key={category} value={category}>{category}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    {/* is premium */}
                    <Select value={isPremium} onValueChange={(value) => setIsPremium(value)}>
                        <SelectTrigger id="isPremium">
                            <SelectValue placeholder="Select post type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="false">Free</SelectItem>
                            <SelectItem value="true">Premium</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="overflow-y-auto flex-grow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Created by</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Premium</TableHead>
                                <TableHead>Up vote</TableHead>
                                <TableHead>Down vote</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allPosts?.map((post: TSinglePost, idx: number) => (
                                <TableRow key={post?._id}>
                                    <TableCell>{(currentPage - 1) * postsPerPage + idx + 1}</TableCell>
                                    <TableCell>{post?.title}</TableCell>
                                    <TableCell>{post?.user?.name}</TableCell>
                                    <TableCell>{post?.category}</TableCell>
                                    <TableCell>{(post?.createdAt).split("T")[0]}</TableCell>
                                    <TableCell>{post?.isPremium ? "Yes" : "No"}</TableCell>
                                    <TableCell>{post?.upvoteCount}</TableCell>
                                    <TableCell>{post?.downvoteCount}</TableCell>
                                    <TableCell>
                                        {/* Delete Button */}
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive" disabled={isDeleting}>Delete</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure to delete?</AlertDialogTitle>
                                                    <AlertDialogDescription>You can&apos;t undo this action.</AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    {/* Confirm Delete Action */}
                                                    <AlertDialogAction onClick={() => handleDeletePost(post?._id)}>Yes! Delete</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination Controls */}
                    <div className="w-full flex justify-center gap-2 py-3">
                        {
                            totalPages > 1 &&
                            pagesArray?.map((page, index) => (
                                <Button
                                    key={index}
                                    variant={currentPage === page + 1 ? "default" : "outline"}
                                    onClick={() => setCurrentPage(page + 1)}
                                    size={"sm"}
                                >
                                    {page + 1}
                                </Button>
                            ))
                        }
                    </div>
                </div>

            </CardContent>
        </Card>
    );
};