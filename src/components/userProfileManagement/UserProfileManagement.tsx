"use client"
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserProfile from './UserProfile';
import MyPostsTable from './MyPostsTable';
import UserPaymentTable from './UserPaymentTable';
import FollowingTable from './FollowingTable';

const UserProfileManagement = () => {

    return (
        <div className="container mx-auto p-4 h-screen flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-primary">User Profile</h1>
            </div>

            {/* Breadcrumb */}
            <div className="text-sm breadcrumbs mb-4">
                <ul className="flex space-x-2 text-gray-600">
                    <li><a href="/" className="hover:underline">Home</a></li>
                    <li>&gt;</li>
                    <li className="text-primary font-semibold">User Profile</li>
                </ul>
            </div>

            <Tabs defaultValue="profile" className="w-full flex-grow flex flex-col">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="posts">My Posts</TabsTrigger>
                    <TabsTrigger value="following">Following</TabsTrigger>
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                </TabsList>
                <div className="flex-grow">
                    <TabsContent value="profile">
                        <UserProfile />
                    </TabsContent>
                    {/* posts */}
                    <TabsContent value="posts" className="h-full">
                        <MyPostsTable />
                    </TabsContent>
                    {/* following */}
                    <TabsContent value="following">
                        <FollowingTable />
                    </TabsContent>
                    {/* payments */}
                    <TabsContent value="payments">
                        <UserPaymentTable />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};

export default UserProfileManagement;
