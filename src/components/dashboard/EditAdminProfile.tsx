"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FieldValues } from 'react-hook-form';
import RHFormProvider from '../form/RHFromProvider';
import RHInput from '../form/RHInput';
import { toast } from 'sonner';
import { useUpdateUserMutation } from '@/redux/features/user/userApi';
import useToken from '@/hooks/useToken';

export const EditAdminModal: React.FC<{ admin: any, refetch: () => void }> = ({ admin, refetch }) => {
    const [open, setOpen] = React.useState(false);
    const [updateUser] = useUpdateUserMutation();
    const token = useToken();

    const handleSubmit = async (data: FieldValues) => {
        console.log('Updated admin data:', data);
        const toastId = toast.loading("Updating admin profile...")
        const formData = new FormData();
        const updatedData = {
            name: data.name,
            email: data.email,
        };
        formData.append('data', JSON.stringify(updatedData));
        const res = await updateUser({ id: admin._id, updatedInfo: formData, token: token })
        if (res?.data) {
            refetch();
            toast.success("Profile updated successfully", { id: toastId, duration: 3000 });
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className='mr-2'>Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Admin</DialogTitle>
                    <DialogDescription>
                        Modify the details for the admin account.
                    </DialogDescription>
                </DialogHeader>
                <RHFormProvider onSubmit={handleSubmit} className="space-y-4">
                    <RHInput
                        type="text"
                        name="name"
                        label="Name"
                        defaultValue={admin.name}
                        placeholder="Enter admin name"
                        required
                    />
                    <RHInput
                        type="email"
                        name="email"
                        label="Email"
                        defaultValue={admin.email}
                        placeholder="Enter admin email"
                        required
                    />
                    <Button type="submit" className="w-full">Update Admin</Button>
                </RHFormProvider>
            </DialogContent>
        </Dialog>
    );
};
