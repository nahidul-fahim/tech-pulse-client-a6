import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagement } from './UserManagement';
import { ContentManagement } from './ContentManagement';
import { PaymentHistory } from './PaymentHistory';
import { AdminControls } from './AdminControls';
import { DashboardGraphs } from './DashboardGraphs';

const AdminDashboard: React.FC = () => {
    return (
        <div className="container mx-auto p-4 space-y-4">
            <div className="text-sm breadcrumbs">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li>Admin Dashboard</li>
                </ul>
            </div>

            <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dashboard Overview</CardTitle>
                        </CardHeader>
                        {/* <CardContent>
                            <DashboardGraphs />
                        </CardContent> */}
                    </Card>
                </TabsContent>
                <TabsContent value="users">
                    <UserManagement />
                </TabsContent>
                <TabsContent value="content">
                    <ContentManagement />
                </TabsContent>
                <TabsContent value="payments">
                    <PaymentHistory />
                </TabsContent>
                <TabsContent value="admin">
                    <AdminControls />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminDashboard;