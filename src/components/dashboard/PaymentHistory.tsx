/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useAllPaymentsQuery } from "@/redux/features/payment/paymentApi";
import useToken from "@/hooks/useToken";
import Loading from "../loading/Loading";
const PaymentHistory = () => {
    const token = useToken();
    const { data, isLoading } = useAllPaymentsQuery({ token });

    if (isLoading) {
        return <Loading />;
    }

    const paymentData = data?.data?.payments;


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
                                <TableHead>User</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Transaction Id</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paymentData?.map((payment: any, idx: number) => (
                                <TableRow key={payment?._id}>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell>{payment?.userId?.name}</TableCell>
                                    <TableCell>{payment?.userId?.email}</TableCell>
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

export default PaymentHistory;