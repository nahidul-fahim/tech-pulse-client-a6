import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export const ContentManagement: React.FC = () => {
    // Mock data - replace with actual data fetching logic
    const posts = [
        { id: 1, title: 'First Post', author: 'John Doe', status: 'Published' },
        { id: 2, title: 'Second Post', author: 'Jane Smith', status: 'Draft' },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Content Management</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{post.author}</TableCell>
                                <TableCell>{post.status}</TableCell>
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