"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, Line, LineChart } from "@/components/ui/chart";

export const DashboardGraphs: React.FC = () => {
    // Mock data - replace with actual data fetching logic
    const monthlyData = [
        { name: 'Jan', payments: 4000, posts: 2400, users: 2400 },
        { name: 'Feb', payments: 3000, posts: 1398, users: 2210 },
        { name: 'Mar', payments: 2000, posts: 9800, users: 2290 },
        { name: 'Apr', payments: 2780, posts: 3908, users: 2000 },
        { name: 'May', payments: 1890, posts: 4800, users: 2181 },
        { name: 'Jun', payments: 2390, posts: 3800, users: 2500 },
    ];

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Monthly Payments</CardTitle>
                </CardHeader>
                <CardContent>
                    <BarChart
                        data={monthlyData}
                        index="name"
                        categories={['payments']}
                        colors={['blue']}
                        yAxisWidth={48}
                        className="h-80"
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Posts and User Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <LineChart
                        data={monthlyData}
                        index="name"
                        categories={['posts', 'users']}
                        colors={['blue', 'green']}
                        yAxisWidth={48}
                        className="h-80"
                    />
                </CardContent>
            </Card>
        </div>
    );
};