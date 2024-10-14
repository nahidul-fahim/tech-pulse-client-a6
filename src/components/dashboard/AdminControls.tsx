"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CreateAdminModal } from './CreateAdminModal';
import { useGetAllUsersQuery, useManageUserMutation } from '@/redux/features/user/userApi';
import useToken from '@/hooks/useToken';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import useCurrentUser from '@/hooks/useCurrentUser';
import { EditAdminModal } from './EditAdminProfile';
import { toast } from 'sonner';
import Loading from '../loading/Loading';

export const AdminControls: React.FC = () => {
    const token = useToken();
    const { data: currentUserData, isLoading: isCurrentUserLoading } = useCurrentUser();
    const { data, isLoading, refetch } = useGetAllUsersQuery({ token });
    const [manageUser, { isLoading: isDeleting }] = useManageUserMutation();

    const handleAdminDelete = async (adminId: string) => {
        const toastId = toast.loading('Deleting Admin...');
        await manageUser({
            id: adminId as string,
            manageData: { isDeleted: true },
            token: token as string,
        });
        toast.success('Admin deleted successfully!', { id: toastId, duration: 2000 });
        refetch();
    }

    if (isLoading || isCurrentUserLoading) {
        return <Loading />
    }
    const currentUser = currentUserData?.data;
    const allAdmins = data?.data?.filter((user: any) => user.role !== "user");

    return (
        <Card>
            <CardHeader>
                <CardTitle>Admin Controls</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <CreateAdminModal />
                </div>
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
                        {allAdmins?.map((admin: any) => (
                            <TableRow key={admin._id}>
                                <TableCell>{admin?.name}</TableCell>
                                <TableCell>{admin?.email}</TableCell>
                                <TableCell className='font-medium capitalize'>{admin?.role}</TableCell>
                                <TableCell>
                                    <EditAdminModal admin={admin} refetch={refetch} />
                                    {/* Delete Button */}
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive"
                                                disabled={currentUser?._id === admin?._id || isDeleting}
                                            >
                                                Delete
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Are you sure to delete?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    You can&apos;t undo this action.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                {/* Confirm Delete Action */}
                                                <AlertDialogAction
                                                onClick={() => handleAdminDelete(admin?._id)}
                                                >
                                                    Yes! Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};