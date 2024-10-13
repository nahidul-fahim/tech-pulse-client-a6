/* eslint-disable @typescript-eslint/no-explicit-any */

export type TUser = {
    userRole: string;
    _id: string;
    name: string;
    email: string;
    role: string;
    profileImg: string;
    bio: string;
    isDeleted: boolean;
    isSubscribed: boolean;
    posts: number;
    followers: number;
    following: number;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
};

export type TSinglePost = {
    _id: string;
    title: string;
    description: string;
    category: string;
    upvoteCount: number;
    downvoteCount: number;
    isPremium: boolean;
    featuredImg?: string;
    user?: TUser;
    comments?: any[];
    createdAt: string;
    updatedAt: string;
};