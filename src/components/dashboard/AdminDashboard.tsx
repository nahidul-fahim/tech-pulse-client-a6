"use client"

import React from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagement } from './UserManagement';
import { ContentManagement } from './ContentManagement';
import { AdminControls } from './AdminControls';
import PaymentHistory from './PaymentHistory';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { logout } from '@/redux/features/auth/authSlice';

const AdminDashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.push('/signin');
    };

    return (
        <div className="container mx-auto p-4 space-y-4">
            {/* Header with logout button */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
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
                    <li className="text-primary font-semibold">Admin Dashboard</li>
                </ul>
            </div>

            {/* Tabs for Admin Dashboard sections */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                </TabsList>

                {/* Overview Tab Content */}
                <TabsContent value="overview">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dashboard Overview</CardTitle>
                        </CardHeader>
                        {/* Uncomment below to display dashboard graphs */}
                        {/* <CardContent>
                            <DashboardGraphs />
                        </CardContent> */}
                    </Card>
                </TabsContent>

                {/* Users Tab Content */}
                <TabsContent value="users">
                    <UserManagement />
                </TabsContent>

                {/* Content Tab Content */}
                <TabsContent value="content">
                    <ContentManagement />
                </TabsContent>

                {/* Payments Tab Content */}
                <TabsContent value="payments">
                    <PaymentHistory />
                </TabsContent>

                {/* Admin Controls Tab Content */}
                <TabsContent value="admin">
                    <AdminControls />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminDashboard;