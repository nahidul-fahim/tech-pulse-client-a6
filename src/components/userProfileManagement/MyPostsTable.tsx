"use client"
import { useGetAllPostsQuery } from "@/redux/features/post/postApi";
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


const MyPostsTable = () => {

    const { data, isLoading, refetch } = useGetAllPostsQuery("");
    const [searchTerm, setSearchTerm] = useState("");

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
                            <PostEditor />
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
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" className="mr-2">Edit</Button>
                                            </DialogTrigger>
                                            <PostEditor post={post} refetch={refetch} />
                                        </Dialog>
                                        <Button variant="destructive">Delete</Button>
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