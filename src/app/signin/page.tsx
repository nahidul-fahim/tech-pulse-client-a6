/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Cpu, Eye, EyeClosed, Loader2 } from "lucide-react";
import RHFormProvider from '@/components/form/RHFromProvider';
import RHInput from '@/components/form/RHInput';
import { toast } from 'sonner';
import { FieldValues } from 'react-hook-form';
import { useSigninMutation } from '@/redux/features/auth/authApi';
import { verifyToken } from '@/utils/verifyToken';
import { setUser, TUser } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { setCookie } from 'cookies-next';
import { useState } from 'react';
import Link from 'next/link';

const SignIn: React.FC = () => {
    const router = useRouter();
    const [signin, { isLoading }] = useSigninMutation();
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);

    // show/hide password
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Signing in...");
        try {
            const signinInfo = {
                email: data?.email,
                password: data?.password,
            };
            // send the formData to api
            const res = await signin(signinInfo).unwrap();
            const user = verifyToken(res?.token) as TUser;


            if (res?.success) {
                toast.success("Signin successful!", { id: toastId, duration: 2000 });
                // setting the user to state
                dispatch(setUser({
                    user: user,
                }));
                setCookie("token", res?.token)
                // redirect to dashboard
                router.push("/");
            } else {
                toast.error(res?.message, { id: toastId, duration: 2000 });
            }
        } catch (error: any) {
            const errorMessage = error?.data?.message || 'An error occurred';
            toast.error(errorMessage, { id: toastId, duration: 2000 });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-[400px] shadow-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center">
                        <Cpu className='mr-1 text-primary w-7 h-7' />
                        <CardTitle className="text-primary text-xl md:text-3xl font-bold text-center">Tech Pulse</CardTitle>
                    </div>
                    <CardDescription className="text-center text-muted-foreground">
                        Enter your credentials to sign in
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RHFormProvider onSubmit={onSubmit} className="space-y-4">
                        <RHInput
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            label='email'
                            required
                        />
                        <div className="relative">
                            <RHInput
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                label='Password'
                                required
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 translate-y-1/2 right-3"
                                onClick={handleShowPassword}>
                                {
                                    showPassword ?
                                        <Eye className="text-body/60 w-4 h-4" />
                                        :
                                        <EyeClosed className="text-body/60 w-4 h-4" />
                                }
                            </button>
                        </div>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {isLoading ? "Signing in" : "Sign In"}
                        </Button>
                    </RHFormProvider>
                </CardContent>
                <CardFooter className='flex flex-col justify-center items-center'>
                    <Link href="/forgot-password" className="text-sm text-secondary hover:underline">
                        Forgot Password?
                    </Link>
                    <p className="text-sm text-center text-muted-foreground w-full">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-primary hover:underline font-medium">
                            Sign Up
                        </Link>
                    </p>
                    <Link href="/" className='mt-2 underline underline-offset-2 text-body hover:text-primary flex justify-start items-center w-fit text-sm'>Back to Home</Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignIn;