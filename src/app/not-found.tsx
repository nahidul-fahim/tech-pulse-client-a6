"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-7xl animate-bounce lg:text-9xl font-extrabold  text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-6">
                Sorry, the page you are looking for does not exist.
            </p>
            <Link
                href="/"
            >
                <Button>
                    Go to Homepage
                </Button>
            </Link>
        </div>
    );
};

export default NotFound;
