/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { useResetPasswordMutation } from '@/redux/features/auth/authApi';
import Link from 'next/link';
import RHFormProvider from '@/components/form/RHFromProvider';
import RHInput from '@/components/form/RHInput';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const router = useRouter();
    const searchParams = useSearchParams()

    // Validate password match
    const validatePassword = () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return false;
        }
        return true;
    };

    const onSubmit = async (data: any) => {
        if (!validatePassword()) return;

        const toastId = toast.loading("Resetting password...");
        try {
            const token = searchParams.get('token');
            const resetInfo = {
                token: token && decodeURIComponent(token),
                password: data?.password
            }
            const res = await resetPassword(resetInfo);
            if (res?.data?.success) {
                router.push("/signin")
                toast.success("Password reset successfully!", { id: toastId, duration: 2000 });
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
                        <CardTitle className="text-primary text-xl md:text-3xl font-semibold text-center">Reset Password</CardTitle>
                    </div>
                    <CardDescription className="text-center text-body">
                        Enter your new password below
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <RHFormProvider onSubmit={onSubmit} className="space-y-4">
                        {/* New password */}
                        <div className="space-y-2">
                            <div className="relative">
                                <RHInput
                                    type='password'
                                    name='password'
                                    placeholder='New password'
                                    className='pl-4'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Confirm password */}
                        <div className="space-y-2">
                            <div className="relative">
                                <RHInput
                                    type='password'
                                    name='confirmPassword'
                                    placeholder='Confirm password'
                                    className='pl-4'
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-600 font-medium text-sm text-center">{error}</p>}

                        {/* Submit button */}
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            Reset Password
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

export default ResetPassword;