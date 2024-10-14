/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Cpu, Eye, EyeClosed, Loader2, Upload } from "lucide-react";
import { useSignUpMutation } from '@/redux/features/auth/authApi';
import { toast } from 'sonner';
import RHFormProvider from '@/components/form/RHFromProvider';
import RHInput from '@/components/form/RHInput';
import RHFileSelect from '@/components/form/RHFileSelect';
import { setCookie } from 'cookies-next';
import { verifyToken } from '@/utils/verifyToken';
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/features/auth/authSlice';
import Image from 'next/image';
import Link from 'next/link';

const SignUp: React.FC = () => {
    const [profileImg, setProfileImg] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const router = useRouter();
    const [error, setError] = useState('');
    const [signUp, { isLoading }] = useSignUpMutation();
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);

    // show/hide password
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // validate email
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // image file change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImg(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // submit the form
    const onSubmit = async (data: any) => {
        if (!validateEmail(data?.email)) {
            setError('Please enter a valid email address.');
            return;
        }
        const toastId = toast.loading("Signing up...")
        try {
            const formData = new FormData();
            const signUpData = {
                name: data?.name,
                email: data?.email,
                password: data?.password
            }
            formData.append('data', JSON.stringify(signUpData))
            if (profileImg) {
                formData.append('file', profileImg);
            }
            else {
                return setError("Please select a profile picture!")
            }

            // send the formData to api
            const res = await signUp(formData).unwrap();
            const user = verifyToken(res?.token);

            if (res?.success) {
                toast.success("Sign up successful!", { id: toastId, duration: 2000 });
                // setting the user to state
                dispatch(setUser({
                    user: user,
                }));
                // setting the token to cookie
                setCookie("token", res?.token)
                router.push("/");
            }
            else {
                toast.error("Failed to sign up!", { id: toastId, duration: 2000 });
            }
        }
        catch (error: any) {
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
                        Enter your details to sign up
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RHFormProvider onSubmit={onSubmit} className="space-y-4">
                        <RHInput
                            name="name"
                            type='text'
                            label='Name'
                            placeholder="John Doe"
                            required
                        />
                        <RHInput
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="m@example.com"
                            required
                        />
                        <div className="relative">
                            <RHInput
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                label="Password"
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
                        <div className="space-y-2">
                            <label>Profile Picture</label>
                            <div className="flex items-center space-x-4">
                                <RHFileSelect
                                    name="profilePicture"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => document.getElementById('profilePicture')?.click()}
                                >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Choose File
                                </Button>
                                {previewUrl && (
                                    <Image src={previewUrl} alt="Profile preview" width={64} height={64} className='rounded-full object-cover'></Image>
                                )}
                            </div>
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isLoading ? "Signing Up" : "Sign up"}
                        </Button>
                    </RHFormProvider>
                </CardContent>
                <CardFooter className='flex flex-col justify-center items-center'>
                    <p className="text-sm text-center text-muted-foreground w-full">
                        Already have an account?{" "}
                        <Link href="/signin" className="text-primary hover:underline font-medium">
                            Sign In
                        </Link>
                    </p>
                    <Link href="/" className='mt-2 underline underline-offset-2 text-body hover:text-primary flex justify-start items-center w-fit text-sm'>Back to Home</Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignUp;