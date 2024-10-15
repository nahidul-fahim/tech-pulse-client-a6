/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import RHFormProvider from '../form/RHFromProvider';
import RHInput from '../form/RHInput';
import RHTextArea from '../form/RHTextArea';
import RHFileSelect from '../form/RHFileSelect';
import { Pen, Upload } from 'lucide-react';
import Image from 'next/image';
import { FieldValues } from 'react-hook-form';
import useCurrentUser from '@/hooks/useCurrentUser';
import { toast } from 'sonner';
import { useUpdateUserMutation } from '@/redux/features/user/userApi';
import useToken from '@/hooks/useToken';
import { useGetUserAllPostsQuery } from '@/redux/features/post/postApi';
import Loading from '../loading/Loading';

const UserProfile = () => {
    const { data, isLoading, refetch } = useCurrentUser();
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
    const token = useToken();
    const [isEditing, setIsEditing] = useState(false);
    const [initialUserData, setInitialUserData] = useState<any>({});
    const [profileImg, setProfileImg] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { data: allPosts, isLoading: allPostsLoading } = useGetUserAllPostsQuery({
        token: token as string,
    });

    // Update initial user data when loading completes
    useEffect(() => {
        if (!isLoading && data?.data) {
            setInitialUserData(data.data);
        }
    }, [isLoading, data]);

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

    // submit the data to the server
    const onSubmit = async (data: FieldValues) => {
        const updatedData: any = {};
        const toastId = toast.loading("Updating profile...");
        for (const key in data) {
            if (data[key] !== initialUserData[key]) {
                updatedData[key] = data[key];
            }
        }
        try {
            const formData = new FormData();
            if (profileImg) {
                formData.append('file', profileImg);
            }
            const updatedData = {
                name: data.name,
                email: data.email,
                bio: data.bio,
            };
            formData.append('data', JSON.stringify(updatedData));
            const res = await updateUser({ id: user._id, updatedInfo: formData, token: token })
            if (res?.data) {
                toast.success("Profile updated successfully", { id: toastId, duration: 3000 });
                refetch();
                setIsEditing(false);
            }
        } catch (error: any) {
            const errorMessage = error.data?.message || "Something went wrong";
            toast.error(errorMessage, { id: toastId, duration: 3000 });
        }
        setInitialUserData({ ...initialUserData, ...updatedData });
    };

    if (isLoading || allPostsLoading) {
        return <Loading />;
    }

    const totalPosts = allPosts?.data?.totalPosts || 0;
    const user = data?.data;

    return (
        <Card>
            <CardHeader className="w-full flex justify-between items-center">
                <div className='w-full flex justify-between items-center'>
                    <div className='w-2/3 space-y-1'>
                        <CardTitle>My Profile</CardTitle>
                        <CardDescription>Manage your personal information and see your stats.</CardDescription>
                    </div>
                    <Button onClick={() => {
                        setIsEditing(true);
                        setInitialUserData(user);
                    }} variant="outline" className="flex items-center">
                        <Pen className="mr-2 size-4" /> Edit Profile
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={user?.profileImg} alt={user?.name} />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-2xl font-bold">{user?.name}</h2>
                        {user?.isSubscribed && <Badge className="mt-1 bg-green-100 text-green-700 font-semibold">Verified</Badge>}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold">{totalPosts}</p>
                        <p className="text-muted-foreground">Posts</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{user?.followers?.length}</p>
                        <p className="text-muted-foreground">Followers</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{user?.following.length}</p>
                        <p className="text-muted-foreground">Following</p>
                    </div>
                </div>

                {!isEditing ? (
                    <>
                        {/* Display static data */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Bio</h3>
                            <p>{user.bio}</p>
                        </div>
                    </>
                ) : (
                    // Editable Form
                    <RHFormProvider onSubmit={onSubmit} defaultValues={user} className="space-y-4">
                        <RHInput name="name" type="text" placeholder="Full Name" label="Full Name" />
                        <RHInput name="email" type="email" placeholder="Email" label="Email" />
                        <RHTextArea name="bio" placeholder="Bio" label="Bio" />

                        {/* Profile Picture Upload */}
                        <div className="space-y-2">
                            <label>Profile Picture</label>
                            <div className="flex items-center space-x-4">
                                {/* Hidden file input */}
                                <RHFileSelect name="profilePicture" className="hidden" onChange={handleFileChange} />
                                {/* Button to trigger file input */}
                                <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('profilePicture')?.click()}>
                                    <Upload className="w-4 h-4 mr-2" />
                                    Change profile picture
                                </Button>
                                {previewUrl && (
                                    <Image src={previewUrl} alt="Profile preview" width={64} height={64} className='rounded-full object-cover'></Image>
                                )}
                            </div>
                        </div>

                        {/* Save Changes and Cancel Buttons */}
                        <div className="flex justify-start space-x-2">
                            <Button type="submit" disabled={isUpdating}>Save Changes</Button>
                            {/* Cancel Button */}
                            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        </div>
                    </RHFormProvider>
                )}
            </CardContent>
        </Card>
    );
};

export default UserProfile;