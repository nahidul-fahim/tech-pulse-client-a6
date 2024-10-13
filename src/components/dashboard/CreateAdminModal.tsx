"use client"

import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FieldValues } from 'react-hook-form';
import RHFormProvider from '../form/RHFromProvider';
import RHInput from '../form/RHInput';

export const CreateAdminModal: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    const handleSubmit = (data: FieldValues) => {
        console.log('New admin data:', data);
        // Here you would typically send this data to your API
        // After successful creation, close the modal
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create New Admin</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Admin</DialogTitle>
                    <DialogDescription>
                        Enter the details for the new admin account.
                    </DialogDescription>
                </DialogHeader>
                <RHFormProvider onSubmit={handleSubmit} className="space-y-4">
                    <RHInput
                        type="text"
                        name="name"
                        label="Name"
                        placeholder="Enter admin name"
                        required
                    />
                    <RHInput
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="Enter admin email"
                        required
                    />
                    <RHInput
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="Enter admin password"
                        required
                    />
                    <Button type="submit" className="w-full">Create Admin</Button>
                </RHFormProvider>
            </DialogContent>
        </Dialog>
    );
};