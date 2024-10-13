"use client"
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserProfile from './UserProfile';
import MyPostsTable from './MyPostsTable';
import UserPaymentTable from './UserPaymentTable';
import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/features/auth/authSlice';
import { useRouter } from 'next/navigation';

const UserProfileManagement = () => {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.push('/signin');
    };

    return (
        <div className="container mx-auto p-4 h-screen flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-primary">User Profile</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
                >
                    Logout
                </button>
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
                        <UserPaymentTable />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};

export default UserProfileManagement;
