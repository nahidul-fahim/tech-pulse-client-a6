/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAppSelector } from "@/redux/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useFollowingListQuery, useUnfollowUserMutation } from "@/redux/features/follow/followApi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useToken from "@/hooks/useToken";
import { Button } from "../ui/button";
import Loading from "../loading/Loading";

const FollowingTable = () => {
    const token = useToken();
    const currentUser = useAppSelector(selectCurrentUser)
    const { data, isLoading, refetch } = useFollowingListQuery({ token: token, userId: currentUser?.userId as string });
    const [unfollowUser] = useUnfollowUserMutation();

    // handle unfollow
    const handleUnfollow = async (targetId: string) => {
        const unfollowData = {
            userId: currentUser?.userId,
            targetUserId: targetId,
        }
        await unfollowUser({ token: token, followInfo: unfollowData })
        refetch();
    }

    if (isLoading) {
        return <Loading />
    }

    const followingList = data?.data;


    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>Following List</CardTitle>
                <CardDescription>Manage the list of people you are following.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
                <div className="overflow-y-auto flex-grow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Avatar</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {followingList?.map((person: any, idx: number) => (
                                <TableRow key={person?._id}>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell>{person?.name}</TableCell>
                                    <TableCell>
                                        <Avatar className="h-8 w-8 mr-2 border border-primary">
                                            <AvatarImage src={person?.profileImg} alt={person?.name} />
                                            <AvatarFallback>{person?.name[0]}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell><Button onClick={() => handleUnfollow(person?._id)} variant="destructive">Unfollow</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default FollowingTable;