import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const PaymentHistory: React.FC = () => {
    // Mock data - replace with actual data fetching logic
    const payments = [
        { id: 1, user: 'John Doe', amount: 100, date: '2024-10-01', status: 'Completed' },
        { id: 2, user: 'Jane Smith', amount: 75, date: '2024-09-30', status: 'Pending' },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payments.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell>{payment.user}</TableCell>
                                <TableCell>${payment.amount}</TableCell>
                                <TableCell>{payment.date}</TableCell>
                                <TableCell>{payment.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};