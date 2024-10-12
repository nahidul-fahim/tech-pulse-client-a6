import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export const AdminControls: React.FC = () => {
    // Mock data - replace with actual data fetching logic
    const admins = [
        { id: 1, name: 'Admin One', email: 'admin1@example.com', role: 'Super Admin' },
        { id: 2, name: 'Admin Two', email: 'admin2@example.com', role: 'Content Manager' },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Admin Controls</CardTitle>
            </CardHeader>
            <CardContent>
                <Button className="mb-4">Create New Admin</Button>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {admins.map((admin) => (
                            <TableRow key={admin.id}>
                                <TableCell>{admin.name}</TableCell>
                                <TableCell>{admin.email}</TableCell>
                                <TableCell>{admin.role}</TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                                    <Button variant="destructive" size="sm">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};