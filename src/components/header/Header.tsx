"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, Info, Mail, User, LogOut, LayoutDashboard, Menu, X, Cpu } from 'lucide-react';

// Assume we have these hooks and utilities
import useCurrentUser from '@/hooks/useCurrentUser';
import { disableHeaderFooter } from '@/utils/disableHeaderFooter';
import { Skeleton } from '../ui/skeleton';
import useLogout from '@/hooks/useLogout';
import useToken from '@/hooks/useToken';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: currentUser, isLoading, refetch } = useCurrentUser();
    const router = useRouter();
    const path = usePathname();
    const logoutUser = useLogout();
    const token = useToken();
    const [userIsPresent, setUserIsPresent] = useState(false);

    useEffect(() => {
        if (token) {
            setUserIsPresent(true);
        }
    }, [token])


    const handleLogout = async () => {
        logoutUser();
        refetch();
        setUserIsPresent(false);
        router.push("/");
    };

    const navItems = [
        { name: 'Home', href: '/', icon: <Home className="w-4 h-4 mr-2" /> },
        { name: 'About', href: '/about', icon: <Info className="w-4 h-4 mr-2" /> },
        { name: 'Contact', href: '/contact', icon: <Mail className="w-4 h-4 mr-2" /> },
    ];

    return <>
        {
            !disableHeaderFooter.includes(path) && (
                <header className="bg-background shadow-none">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            {/* Logo */}
                            <div className="flex items-center group">
                                <Link href="/" className="flex items-center">
                                    <Cpu className='mr-1 text-primary group-hover:scale-110 duration-1000 animate-bounce' />
                                    <span className="text-2xl font-bold text-primary">Tech-Pulse</span>
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-secondary hover:text-primary flex items-center font-medium"
                                    >
                                        {item.icon}
                                        {item.name}
                                    </Link>
                                ))}
                                {!isLoading && currentUser?.data?.role === 'admin' && (
                                    <Link href="/admin-dashboard" className="text-secondary hover:text-primary flex items-center">
                                        <LayoutDashboard className="w-4 h-4 mr-2" />
                                        Dashboard
                                    </Link>
                                )}
                            </nav>

                            {/* Mobile menu button */}
                            <div className="md:hidden">
                                <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                </Button>
                            </div>

                            {/* Auth buttons or User menu */}
                            <div className="hidden md:block">
                                {isLoading ? (
                                    <Skeleton className="h-4 w-[150px]" />
                                ) : userIsPresent ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={currentUser.data?.profileImg} alt={currentUser.data?.name} />
                                                    <AvatarFallback>{currentUser.data?.name?.[0]}</AvatarFallback>
                                                </Avatar>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => router.push('/my-profile')} className='cursor-point'>
                                                <User className="mr-2 h-4 w-4" />
                                                <span>Profile</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={handleLogout} className='cursor-point'>
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Log out</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <div className="space-x-2">
                                        <Button variant="ghost" onClick={() => router.push('/signin')}>Sign In</Button>
                                        <Button onClick={() => router.push('/signup')}>Sign Up</Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-secondary hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span className="flex items-center">
                                            {item.icon}
                                            {item.name}
                                        </span>
                                    </Link>
                                ))}
                                {!isLoading && currentUser?.data?.role === 'admin' && (
                                    <Link
                                        href="/dashboard"
                                        className="text-secondary hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span className="flex items-center">
                                            <LayoutDashboard className="w-4 h-4 mr-2" />
                                            Dashboard
                                        </span>
                                    </Link>
                                )}
                                {!isLoading && (
                                    currentUser ? (
                                        <>
                                            <Link
                                                href="/profile"
                                                className="text-secondary hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <span className="flex items-center">
                                                    <User className="w-4 h-4 mr-2" />
                                                    Profile
                                                </span>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setIsMenuOpen(false);
                                                }}
                                                className="text-secondary hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                                            >
                                                <span className="flex items-center">
                                                    <LogOut className="w-4 h-4 mr-2" />
                                                    Log out
                                                </span>
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href="/signin"
                                                className="text-secondary hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Sign In
                                            </Link>
                                            <Link
                                                href="/signup"
                                                className="text-secondary hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Sign Up
                                            </Link>
                                        </>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </header>
            )
        }
    </>
};

export default Header;