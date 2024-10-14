/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { FieldValues } from 'react-hook-form';
import RHInput from '@/components/form/RHInput';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useForgetPasswordMutation } from '@/redux/features/auth/authApi';
import Link from 'next/link';
import { Cpu } from 'lucide-react';
import RHFormProvider from '@/components/form/RHFromProvider';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

    // validate email
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const onSubmit = async (data: FieldValues) => {
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        const toastId = toast.loading("Sending reset link...");
        try {
            const res = await forgetPassword(data);
            if (res?.data?.success) {
                toast.success("Reset link sent to your email!", { id: toastId, duration: 2000 });
            }
        } catch (error: any) {
            const errorMessage = error?.data?.message || 'An error occurred';
            toast.error(errorMessage, { id: toastId, duration: 2000 });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-white to-gray-200 flex items-center justify-center py-12 px-3 md:px-8">
            <Card className="w-full max-w-md bg-white p-2 lg:p-6">
                <CardHeader className="space-y-1 mb-2">
                    <div className="flex items-center justify-center">
                        <Cpu className='mr-1 text-primary w-7 h-7' />
                        <CardTitle className="text-primary text-xl md:text-3xl font-bold text-center">Tech Pulse</CardTitle>
                    </div>
                    <CardDescription className="text-center text-body">
                        Enter your email to reset your password
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <RHFormProvider onSubmit={onSubmit} className="space-y-4">
                        {/* email */}
                        <div className="space-y-2">
                            <div className="relative">
                                <RHInput
                                    type='email'
                                    name='email'
                                    placeholder='johndoe@gmail.com'
                                    className='pl-4'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        {error && <p className="text-red-600 font-medium text-sm text-center">{error}</p>}

                        {/* submit button */}
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            Send Reset Link
                        </Button>
                    </RHFormProvider>
                </CardContent>

                <CardFooter className="flex flex-col space-y-2">
                    <div className="text-sm text-center text-body">
                        <span>Remember your password? </span>
                        <Link href="/signin" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ForgotPassword;