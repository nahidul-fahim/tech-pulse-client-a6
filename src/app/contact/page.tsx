"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-primary/10 to-secondary/10">
            <div className="max-w-6xl mx-auto p-4 py-8">
                <h1 className="text-4xl font-bold text-primary mb-8 text-center">Contact Us</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold text-primary">Get in Touch</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-secondary mb-1">Name</label>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-secondary mb-1">Email</label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-1">Subject</label>
                                    <Input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-secondary mb-1">Message</label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full"
                                        rows={4}
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold text-primary">Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="flex items-center">
                                    <Mail className="h-6 w-6 text-primary mr-3" />
                                    <div>
                                        <h3 className="font-semibold text-secondary">Email</h3>
                                        <p className="text-body">support@techpulse.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="h-6 w-6 text-primary mr-3" />
                                    <div>
                                        <h3 className="font-semibold text-secondary">Phone</h3>
                                        <p className="text-body">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="h-6 w-6 text-primary mr-3" />
                                    <div>
                                        <h3 className="font-semibold text-secondary">Address</h3>
                                        <p className="text-body">123 Tech Street, San Francisco, CA 94105</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-6 w-6 text-primary mr-3" />
                                    <div>
                                        <h3 className="font-semibold text-secondary">Office Hours</h3>
                                        <p className="text-body">Monday - Friday: 9:00 AM - 5:00 PM (PST)</p>
                                        <p className="text-body">Saturday - Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;