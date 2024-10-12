"use client"
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserProfile from './UserProfile';
import MyPostsTable from './MyPostsTable';

const UserProfileManagement = () => {
    return (
        <div className="container mx-auto p-4 h-screen flex flex-col">
            <h1 className="text-3xl font-bold text-primary mb-6">User Profile</h1>
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
                    <TabsContent value="posts" className="h-full">
                        <MyPostsTable />
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
                </div>
            </Tabs>
        </div>
    );
};

export default UserProfileManagement;