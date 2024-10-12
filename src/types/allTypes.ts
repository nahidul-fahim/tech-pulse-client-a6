/* eslint-disable @typescript-eslint/no-explicit-any */
export type TSinglePost = {
    _id: string;
    title: string;
    description: any;
    category: string;
    upvoteCount: number;
    downvoteCount: number;
    isPremium: boolean;
    featuredImg?: string;
    user?: string;
    comments?: any[];
    createdAt: string;
    updatedAt: string;
}