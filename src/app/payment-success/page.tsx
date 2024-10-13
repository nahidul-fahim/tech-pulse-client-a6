"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";

const PaymentSuccess = () => {

    return (
        <div className="w-full h-screen flex flex-col gap-3 justify-center items-center">
            <h1 className="text-4xl font-bold text-primary">Payment successful!</h1>
            <Link href={"/"}>
                <Button>
                    Home
                </Button>
            </Link>
        </div>
    );
};

export default PaymentSuccess;