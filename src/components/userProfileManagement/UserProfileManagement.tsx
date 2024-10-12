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
import MyPostsTable from './MyPostsTable';

const UserProfileManagement = () => {
    // const [currentPage, setCurrentPage] = useState(1);
    // const postsPerPage = 5;

    // Paginate posts
    // const indexOfLastPost = currentPage * postsPerPage;
    // const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

                <MyPostsTable />
                
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