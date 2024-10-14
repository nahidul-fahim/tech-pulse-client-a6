/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useUserPaymentsQuery } from "@/redux/features/payment/paymentApi";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
const UserPaymentTable = () => {
    const { data: currentUserData, isLoading: currentUserLoading } = useCurrentUser();
    const [currentUsedId, setCurrentUsedId] = useState("");
    const { data, isLoading } = useUserPaymentsQuery({ id: currentUsedId });

    useEffect(() => {
        if (!currentUserLoading) {
            setCurrentUsedId(currentUserData?.data?._id)
        }
    }, [currentUserData?.data?._id, currentUserLoading]);

    if (currentUserLoading || isLoading) {
        return <Loading />
    }

    const paymentData = data?.data;


    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>Manage your payment methods and transactions</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
                <div className="overflow-y-auto flex-grow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead>Transaction Id</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paymentData?.map((payment: any, idx: number) => (
                                <TableRow key={payment?._id}>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell>{payment?.transactionId}</TableCell>
                                    <TableCell>${payment?.paidAmount}</TableCell>
                                    <TableCell>{(payment?.createdAt).split("T")[0]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserPaymentTable;