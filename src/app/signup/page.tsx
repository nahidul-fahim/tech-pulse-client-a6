"use client"
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2, Upload } from "lucide-react";

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePicture(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('name', name);
        if (profilePicture) {
            formData.append('profilePicture', profilePicture);
        }

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                router.push('/signin');
            } else {
                const data = await response.json();
                setError(data.message || 'An error occurred during sign-up');
            }
        } catch (err) {
            setError('An error occurred during sign-up');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-[400px] shadow-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center text-primary">Create an account</CardTitle>
                    <CardDescription className="text-center text-muted-foreground">
                        Enter your details to sign up
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="profilePicture">Profile Picture</Label>
                            <div className="flex items-center space-x-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Choose File
                                </Button>
                                <Input
                                    id="profilePicture"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    ref={fileInputRef}
                                />
                                {previewUrl && (
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                        <img src={previewUrl} alt="Profile preview" className="object-cover w-full h-full" />
                                    </div>
                                )}
                            </div>
                        </div>
                        {error && <p className="text-sm text-destructive">{error}</p>}
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Sign Up
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-center text-muted-foreground w-full">
                        Already have an account?{" "}
                        <a href="/signin" className="text-primary hover:underline font-medium">
                            Sign In
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignUp;