/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useDeletePostMutation, useGetAllPostsQuery } from "@/redux/features/post/postApi";
import PostEditor from "../postEditor/PostEditor";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Pagination } from "../ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { TabsContent } from "../ui/tabs";
import { useState } from "react";
import { TSinglePost } from "@/types/allTypes";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import useToken from "@/hooks/useToken";
import { toast } from "sonner";


const MyPostsTable = () => {

    const { data, isLoading, refetch } = useGetAllPostsQuery("");
    const [searchTerm, setSearchTerm] = useState("");
    const token = useToken();
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
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    const allPosts = data?.data;

    return (
        <TabsContent value="posts">
            <Card>
                <CardHeader>
                    <CardTitle>My Posts</CardTitle>
                    <CardDescription>Manage your posts here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between mb-4">
                        <Input
                            placeholder="Search posts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-1/3"
                        />
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>New Post</Button>
                            </DialogTrigger>
                            <PostEditor post={null} refetch={refetch} />
                        </Dialog>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Premium</TableHead>
                                <TableHead>Up vote</TableHead>
                                <TableHead>Down vote</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allPosts?.map((post: TSinglePost) => (
                                <TableRow key={post?._id}>
                                    <TableCell>{post?.title}</TableCell>
                                    <TableCell>{post?.category}</TableCell>
                                    <TableCell>{(post?.createdAt).split("T")[0]}</TableCell>
                                    <TableCell>{post?.isPremium ? "Yes" : "No"}</TableCell>
                                    <TableCell>{post?.upvoteCount}</TableCell>
                                    <TableCell>{post?.downvoteCount}</TableCell>
                                    <TableCell>
                                        {/* edit functionality */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" className="mr-2">Edit</Button>
                                            </DialogTrigger>
                                            <PostEditor post={post} refetch={refetch} />
                                        </Dialog>
                                        {/* delete functionality */}
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive" disabled={isDeleting}>Delete</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure to delete?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        You can&apos;t undo this action.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDeletePost(post?._id)}>Yes! Delete</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* <Pagination
                        className="mt-4"
                        currentPage={currentPage}
                        totalCount={filteredPosts.length}
                        pageSize={postsPerPage}
                        onPageChange={paginate}
                    /> */}
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default MyPostsTable;