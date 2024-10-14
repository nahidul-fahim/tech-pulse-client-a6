"use client";

import React, { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from '../ui/chart';
import { Card, CardContent } from '../ui/card';
import { useAdminDashboardDataQuery } from '@/redux/features/user/userApi';
import useToken from '@/hooks/useToken';
import Loading from '../loading/Loading';

export const DashboardGraphs: React.FC = () => {
    const token = useToken();
    const { data, isLoading } = useAdminDashboardDataQuery({ token: token });

    const chartData = useMemo(() => {
        if (!data || !data.success) return [];

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        return months.map((month, index) => {
            const user = data.data.users[index]?.userCount || 0;
            const post = data.data.posts[index]?.postCount || 0;
            const payment = data.data.payments[index]?.totalAmount || 0;
            return {
                month,
                users: user,
                posts: post,
                payments: payment,
            };
        });
    }, [data]);

    if (isLoading) {
        return <Loading />
    }

    const chartConfig = {
        users: {
            label: "Users",
            color: "#2563eb",
        },
        posts: {
            label: "Posts",
            color: "#60a5fa",
        },
        payments: {
            label: "Payments",
            color: "#34d399",
        },
    } satisfies ChartConfig;

    return (
        <Card>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart data={chartData} height={200} width={500}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={6}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="users" fill="var(--color-users)" radius={5} />
                        <Bar dataKey="posts" fill="var(--color-posts)" radius={5} />
                        <Bar dataKey="payments" fill="var(--color-payments)" radius={5} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
