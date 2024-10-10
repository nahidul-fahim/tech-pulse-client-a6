"use client"
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UserProfile from './UserProfile';
import PostEditor from '../postEditor/PostEditor';

// Mock data for posts (extended with category and premium status)
const mockPosts = [
    { id: 1, title: "First Post", content: "This is the content of the first post", date: "2024-10-01", category: "Web", isPremium: false },
    { id: 2, title: "Second Post", content: "This is the content of the second post", date: "2024-10-02", category: "AI", isPremium: true },
    { id: 3, title: "Third Post", content: "This is the content of the third post", date: "2024-10-03", category: "Software Engineering", isPremium: false },
];

const UserProfileManagement = () => {
    const [posts, setPosts] = useState(mockPosts);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    // Filter and sort posts
    const filteredPosts = posts
        .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => (a[sortBy] > b[sortBy] ? -1 : 1));

    // Paginate posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-primary mb-6">User Profile</h1>
            <Tabs defaultValue="profile" className="w-full">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="posts">My Posts</TabsTrigger>
                    <TabsTrigger value="following">Following</TabsTrigger>
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <UserProfile />
                </TabsContent>

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
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentPosts.map((post) => (
                                        <TableRow key={post.id}>
                                            <TableCell>{post.title}</TableCell>
                                            <TableCell>{post.category}</TableCell>
                                            <TableCell>{post.date}</TableCell>
                                            <TableCell>{post.isPremium ? "Yes" : "No"}</TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" className="mr-2">Edit</Button>
                                                    </DialogTrigger>
                                                    <PostEditor post={post} />
                                                </Dialog>
                                                <Button variant="destructive">Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination
                                className="mt-4"
                                currentPage={currentPage}
                                totalCount={filteredPosts.length}
                                pageSize={postsPerPage}
                                onPageChange={paginate}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="following">
                    <Card>
                        <CardHeader>
                            <CardTitle>Following Activity</CardTitle>
                            <CardDescription>See the latest updates from accounts you follow.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Add following activity content here */}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="payments">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Information</CardTitle>
                            <CardDescription>Manage your payment methods and transactions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Add payment management content here */}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default UserProfileManagement;