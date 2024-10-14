/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown, MessageSquare, Calendar, Edit2, Trash2, FileText } from "lucide-react";
import { useGetSinglePostQuery, useVotePostMutation } from '@/redux/features/post/postApi';
import useToken from '@/hooks/useToken';
import { useCreateNewCommentMutation, useDeleteCommentMutation, useSinglePostCommentsQuery, useUpdateCommentMutation } from '@/redux/features/comment/commentApi';
import useCurrentUser from '@/hooks/useCurrentUser';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import html2pdf from 'html2pdf.js'
import {
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon,
    WhatsappIcon,
    XIcon,
} from "react-share";
import { useFollowUserMutation, useUnfollowUserMutation } from '@/redux/features/follow/followApi';
import Loading from '@/components/loading/Loading';
import { toast } from 'sonner';

interface PostDetailsProps {
    params: {
        id: string;
    };
}

const PostDetails: React.FC<PostDetailsProps> = ({ params }) => {
    const { id } = params;
    const token = useToken();
    const { data: currentUserData, isLoading: currentUserLoading } = useCurrentUser();
    const { data, isLoading, refetch } = useGetSinglePostQuery(id);
    const [votePost] = useVotePostMutation();
    const [createNewComment] = useCreateNewCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();
    const [updateComment] = useUpdateCommentMutation();
    const { data: commentData, isLoading: commentLoading, refetch: commentRefetch } = useSinglePostCommentsQuery({ postId: id })
    const [newComment, setNewComment] = useState('');
    const [editedCommentContent, setEditedCommentContent] = useState('');
    const [showEditCommentBox, setShowEditCommentBox] = useState(false);
    const router = useRouter();
    const [followUser] = useFollowUserMutation();
    const [unfollowUser] = useUnfollowUserMutation();
    const contentRef = useRef<HTMLDivElement | null>(null);


    // premium article check
    useEffect(() => {
        if (!isLoading && !currentUserLoading) {
            const isSubscribed = currentUserData?.data?.isSubscribed;
            const currentPostStatus = data?.data?.isPremium;
            if (currentPostStatus && !isSubscribed) {
                router.push('/upgrade-premium')
            }
        }
    }, [currentUserData?.data?.isSubscribed, data?.data?.isPremium, isLoading, currentUserLoading, router])

    // handle pdf download
    const handleDownload = () => {
        const element = contentRef.current
        if (!element) return

        const options = {
            margin: 1,
            filename: `${data?.data?.title}-tech-pulse.pdf`,
            image: { type: 'jpeg', quality: 0.5 },
            html2canvas: {
                scale: 2,
                backgroundColor: '#000',
                useCORS: true
            },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        }

        html2pdf().from(element).set(options).save()
    }

    // upvote/downvote logic
    const handleVotePost = async (vote: boolean) => {
        if (!token) {
            return toast.warning('Please sign in', { duration: 2000 });
        }
        if (vote === true) {
            const voteData = { voteStatus: true };
            await votePost({ token: token, id: id, voteType: voteData });
        }
        else if (vote === false) {
            const voteData = { voteStatus: false };
            await votePost({ token: token, id: id, voteType: voteData });
        }
        refetch();
    };

    // handle add new comment
    const handleAddComment = async () => {
        if (!token) {
            return toast.warning('Please sign in', { duration: 2000 });
        }
        const commentData = { comment: newComment }
        await createNewComment({ token: token, postId: id, commentInfo: commentData })
        setNewComment('');
        refetch();
        commentRefetch();
    };

    // handle follow user
    const handleFollow = async (followStatus: string) => {
        if (!token) {
            return toast.warning('Please sign in', { duration: 2000 });
        }
        const currentUserId = currentUserData?.data?._id;
        const targetUserId = singlePost?.user?._id;
        const followData = {
            userId: currentUserId,
            targetUserId: targetUserId,
        }
        if (followStatus === 'unfollow') {
            await unfollowUser({ token: token, followInfo: followData })
        }
        if (followStatus === 'follow') {
            await followUser({ token: token, followInfo: followData })
        }
        refetch();
    };

    // edit comment
    const handleEditComment = async (commentId: string) => {
        if (!token) {
            return toast.warning('Please sign in', { duration: 2000 });
        }
        const updatedCommentData = { comment: editedCommentContent }
        await updateComment({ token: token, commentId: commentId, commentInfo: updatedCommentData })
        setEditedCommentContent('');
        refetch();
        commentRefetch();
        setShowEditCommentBox(false)
    };

    // handle delete comment
    const handleDeleteComment = async (commentId: string) => {
        if (!token) {
            return toast.warning('Please sign in', { duration: 2000 });
        }
        await deleteComment({ token: token, commentId: commentId });
        refetch();
        commentRefetch();
    };

    if (isLoading || commentLoading || currentUserLoading) {
        return <Loading />
    }

    const singlePost = data?.data;
    const allComments = commentData?.data;
    const currentUser = currentUserData?.data;
    const shareUrl = `https://tech-pulse.vercel.app/post/${singlePost?.id}`;
    const title = singlePost?.title;
    const isTheSameUser = currentUser?._id === singlePost?.user?._id;
    const isFollowing = singlePost?.user?.followers.includes(currentUser?._id);

    return (
        <div ref={contentRef} className="max-w-4xl mx-auto p-4 bg-gradient-to-b from-background to-background/80">
            <Card className="mb-8 shadow-lg overflow-hidden border-none bg-card/50 backdrop-blur-sm">
                <div className="relative">
                    <Image src={singlePost?.featuredImg} alt={singlePost.title} width={1000} height={500} className="w-full h-80 object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <span className="text-sm font-medium text-primary-foreground bg-primary text-white px-3 py-1 rounded-full">{singlePost?.category}</span>
                        <h1 className="text-3xl font-bold text-white mt-2">{singlePost?.title}</h1>
                    </div>
                </div>
                <CardHeader>
                    <div className="flex items-center justify-between text-sm text-secondary">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-10 w-10 border-2 border-primary">
                                <AvatarImage src={singlePost?.user?.profileImg} alt={singlePost?.user?.name} />
                                <AvatarFallback>{singlePost?.user?.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="font-semibold text-foreground">{singlePost?.user?.name}</span>
                            </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                            {!isTheSameUser && (
                                <Button
                                    variant={isFollowing ? "default" : "outline"}
                                    onClick={() => handleFollow(isFollowing ? 'unfollow' : 'follow')}
                                    className="rounded-full"
                                >
                                    {isFollowing ? 'Following' : 'Follow'}
                                </Button>
                            )}
                            <Button variant="outline" onClick={handleDownload} className="rounded-full">
                                <FileText className='w-4 h-4 mr-2' />PDF
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center text-xs text-secondary mt-4">
                        <Calendar className="mr-2 h-4 w-4" />
                        {new Date(singlePost?.createdAt).toLocaleDateString()}
                    </div>
                </CardHeader>
                <CardContent>
                    <div
                        dangerouslySetInnerHTML={{ __html: singlePost?.description }}
                        className="blog lg:pr-40 text-justify prose prose-sm max-w-none"
                    ></div>
                </CardContent>
                <CardFooter className='flex justify-between items-center border-t border-border/50 mt-6 pt-4'>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" onClick={() => handleVotePost(true)} className="flex items-center">
                            <ThumbsUp className={`mr-1 h-4 w-4 ${singlePost?.userHasUpvoted ? 'text-primary' : ''}`} /> {singlePost?.upvoteCount}
                        </Button>
                        <Button variant="ghost" onClick={() => handleVotePost(false)} className="flex items-center">
                            <ThumbsDown className={`mr-1 h-4 w-4 ${singlePost?.userHasDownvoted ? 'text-primary' : ''}`} /> {singlePost?.downvoteCount}
                        </Button>
                        <span className="flex items-center">
                            <MessageSquare className="mr-1 h-4 w-4" /> {singlePost?.comments.length}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FacebookShareButton url={shareUrl}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <TwitterShareButton url={shareUrl} title={title}>
                            <XIcon size={32} round />
                        </TwitterShareButton>
                        <LinkedinShareButton url={shareUrl}>
                            <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                        <TelegramShareButton url={shareUrl} title={title}>
                            <TelegramIcon size={32} round />
                        </TelegramShareButton>
                        <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                    </div>
                </CardFooter>
            </Card>

            <Card className="mb-8 shadow-lg border-none bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-primary">Comments</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="mb-2 bg-background/50"
                    />
                    <Button onClick={handleAddComment} variant={"default"} className='w-full'>
                        Post Comment
                    </Button>
                </CardContent>
            </Card>

            <div className="space-y-4">
                {allComments?.map((comment: any) => (
                    <Card key={comment.id} className="shadow border-none bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Avatar className="h-8 w-8 mr-2 border border-primary">
                                        <AvatarImage src={comment?.user?.profileImg} alt={comment?.user?.name} />
                                        <AvatarFallback>{comment?.user?.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-semibold text-foreground">{comment?.user?.name}</span>
                                </div>
                                <span className="text-xs text-secondary">
                                    {(comment.createdAt && new Date(comment.createdAt).toLocaleDateString())}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {currentUser?._id === comment?.user?._id && showEditCommentBox ? (
                                <Textarea
                                    defaultValue={comment?.comment}
                                    onChange={(e) => setEditedCommentContent(e.target.value)}
                                    className="mb-2 bg-background/50"
                                />
                            ) : (
                                <p className="text-body">{comment?.comment}</p>
                            )}
                        </CardContent>
                        <CardFooter className={`${currentUser?._id === comment?.user?._id ? 'flex justify-end' : 'hidden'} space-x-1`}>
                            {!showEditCommentBox && (
                                <Button variant="ghost" onClick={() => setShowEditCommentBox(true)}>
                                    <Edit2 className="h-4 w-4 mr-1" />
                                </Button>
                            )}
                            {showEditCommentBox && (
                                <Button variant="ghost" onClick={() => handleEditComment(comment._id)}>
                                    Save
                                </Button>
                            )}
                            <Button variant="ghost" onClick={() => handleDeleteComment(comment._id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PostDetails;