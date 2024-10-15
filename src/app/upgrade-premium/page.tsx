"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useCurrentUser from '@/hooks/useCurrentUser';
import { useMakePaymentMutation } from '@/redux/features/payment/paymentApi';
import useToken from '@/hooks/useToken';
import Link from 'next/link';
import Loading from '@/components/loading/Loading';
import { toast } from 'sonner';

const UpgradePremium: React.FC = () => {

    const { data, isLoading } = useCurrentUser();
    const token = useToken();
    const [makePayment] = useMakePaymentMutation();


    const handlePayment = async () => {
        if (!token) {
            return toast.warning("Please sign in to continue");
        }
        if (currentUser && token) {
            const info = { userId: currentUser._id }
            const res = await makePayment({ token: token, info: info })
            console.log("res =>", res)
            if (res?.data) {
                window.location.href = res?.data?.data?.payment_url;
            }
        }
    }

    if (isLoading) {
        return <Loading />
    }

    const currentUser = data?.data;


    return (
        <div className="max-w-4xl mx-auto p-4 h-[100vh] flex justify-center items-center">
            <Card className="mb-8 shadow-lg">
                <CardHeader className='flex flex-col justify-center items-center gap-4'>
                    <CardTitle className="text-xl font-bold text-primary">Upgrade Your Package</CardTitle>
                    <p className="text-5xl font-extrabold text-secondary animate-bounce">$20</p>
                </CardHeader>
                <CardContent className='flex flex-col justify-center items-center'>
                    <p className="mb-4">
                        To access this content, you need to upgrade your package.
                    </p>
                    <div className=' flex justify-center items-center gap-4'>
                        <Button onClick={handlePayment} variant={"default"}>
                            Upgrade Now
                        </Button>
                        <Link href={"/"}>
                            <Button variant={"outline"}>
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpgradePremium;