/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    useGetAllUsersQuery,
    useManageUserMutation,
} from "@/redux/features/user/userApi";
import useToken from "@/hooks/useToken";
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
import { toast } from "sonner";
import Loading from "../loading/Loading";

export const UserManagement: React.FC = () => {
    const token = useToken();
    const { data, isLoading, refetch } = useGetAllUsersQuery({ token });
    const [manageUser, { isLoading: isManaging }] = useManageUserMutation();

    // Handle block/unblock or delete user
    const handleManageUser = async (userId: string, action: string) => {
        const toastId = toast.loading(
            action === "block" ? "Blocking user..." : "Deleting user..."
        );
        try {
            if (action === "block") {
                // Toggle block/unblock based on the user's current status
                const user = data?.data.find((user: any) => user._id === userId);
                const isBlocked = user?.isBlocked;
                await manageUser({
                    id: userId as string,
                    manageData: { isBlocked: !isBlocked },
                    token: token as string,
                });
                toast.success(
                    isBlocked
                        ? "User unblocked successfully."
                        : "User blocked successfully.",
                    { id: toastId, duration: 2000 }
                );
            } else if (action === "delete") {
                await manageUser({
                    id: userId as string,
                    manageData: { isDeleted: true },
                    token: token as string,
                });
                toast.success("User deleted successfully.", {
                    id: toastId,
                    duration: 2000,
                });
            }
            refetch();
        } catch (error: any) {
            const errorMessage = error?.data?.message || "Failed to manage user";
            toast.error(errorMessage, { id: toastId, duration: 2000 });
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    const allUsers = data?.data?.filter((user: any) => user.role !== "admin");

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Verification Status</TableHead>
                            <TableHead>Block status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allUsers?.map((user: any) => (
                            <TableRow key={user._id}>
                                <TableCell>{user?.name}</TableCell>
                                <TableCell>{user?.email}</TableCell>
                                <TableCell className="capitalize font-medium">
                                    {user?.role}
                                </TableCell>
                                <TableCell
                                    className={`${user?.isSubscribed ? "text-primary" : "text-body"
                                        } font-medium rounded-xl`}
                                >
                                    {user?.isSubscribed ? "Verified" : "Not Verified"}
                                </TableCell>
                                <TableCell
                                    className={`${user?.isBlocked ? "text-red-600" : "text-green-600"
                                        } font-medium rounded-xl`}
                                >
                                    {user?.isBlocked ? "Blocked" : "Not Blocked"}
                                </TableCell>
                                <TableCell>
                                    {/* Block/Unblock button */}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mr-2"
                                        disabled={isManaging}
                                        onClick={() => handleManageUser(user?._id, "block")}
                                    >
                                        {user?.isBlocked ? "Unblock" : "Block"}
                                    </Button>
                                    {/* Delete Button */}
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" disabled={isManaging}>
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
                                                    onClick={() => handleManageUser(user?._id, "delete")}
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
