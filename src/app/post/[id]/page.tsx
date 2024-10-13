/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown, MessageSquare, Calendar, Edit2, Trash2 } from "lucide-react";
import { useGetSinglePostQuery, useVotePostMutation } from '@/redux/features/post/postApi';
import useToken from '@/hooks/useToken';
import { useCreateNewCommentMutation, useDeleteCommentMutation, useSinglePostCommentsQuery, useUpdateCommentMutation } from '@/redux/features/comment/commentApi';
import useCurrentUser from '@/hooks/useCurrentUser';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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


    useEffect(() => {
        if (!isLoading && !currentUserLoading) {
            const isSubscribed = currentUserData?.data?.isSubscribed;
            const currentPostStatus = data?.data?.isPremium;
            if (currentPostStatus && !isSubscribed) {
                console.log('User is subscribed and post is premium');
                router.push('/upgrade-premium')
            }
        }
    }, [currentUserData?.data?.isSubscribed, data?.data?.isPremium, isLoading, currentUserLoading, router])

    // upvote/downvote logic
    const handleVotePost = async (vote: boolean) => {
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
        const commentData = { comment: newComment }
        await createNewComment({ token: token, postId: id, commentInfo: commentData })
        setNewComment('');
        refetch();
        commentRefetch();
    };

    const handleFollow = async () => {
        // await followAuthor(singlePost.user.id);
        refetch();
    };

    // edit comment
    const handleEditComment = async (commentId: string) => {
        const updatedCommentData = { comment: editedCommentContent }
        await updateComment({ token: token, commentId: commentId, commentInfo: updatedCommentData })
        setEditedCommentContent('');
        refetch();
        commentRefetch();
        setShowEditCommentBox(false)
    };

    // handle delete comment
    const handleDeleteComment = async (commentId: string) => {
        await deleteComment({ token: token, commentId: commentId });
        refetch();
        commentRefetch();
    };

    if (isLoading || commentLoading || currentUserLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    const singlePost = data?.data;
    const allComments = commentData?.data;
    const currentUser = currentUserData?.data;
    const shareUrl = `https://tech-pulse.vercel.app/post/${singlePost?.id}`;
    const title = singlePost?.title;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Card className="mb-8 shadow-lg overflow-hidden">
                <Image src={singlePost?.featuredImg} alt={singlePost.title} width={200} height={100} className="w-full h-64 object-cover" />
                <CardHeader>
                    {/* Breadcrumb */}
                    <div className="text-sm breadcrumbs mb-4">
                        <ul className="flex space-x-2 text-gray-600">
                            <li><a href="/" className="hover:underline">Home</a></li>
                            <li>&gt;</li>
                            <li className="text-primary font-semibold">Post Details</li>
                        </ul>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-secondary bg-secondary/10 px-2 py-1 rounded">{singlePost?.category}</span>
                        <div className="flex items-center text-secondary space-x-4">
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
                    </div>
                    <CardTitle className="text-3xl font-bold text-primary">{singlePost?.title}</CardTitle>
                    <div className="flex items-center justify-between text-sm text-secondary mt-2">
                        <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={singlePost?.user?.profileImg} alt={singlePost?.user?.name} />
                                <AvatarFallback>{singlePost?.user?.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="font-semibold">{singlePost?.user?.name}</span>
                                <span className="text-xs">{singlePost?.user?.username}</span>
                            </div>
                        </div>
                        <Button variant="outline" onClick={handleFollow}>
                            {singlePost?.user?.isFollowed ? 'Following' : 'Follow'}
                        </Button>
                    </div>
                    <div className="flex items-center text-xs text-secondary mt-2">
                        <Calendar className="mr-1 h-4 w-4" />
                        {new Date(singlePost?.createdAt).toLocaleDateString()}
                    </div>
                </CardHeader>
                <CardContent>
                    <div
                        dangerouslySetInnerHTML={{ __html: singlePost?.description }}
                        className="blog lg:pr-40 text-justify"
                    ></div>
                </CardContent>
                <CardFooter className='flex justify-start items-center gap-3'>
                    {/* <Button variant="outline" className="ml-auto">
                        <Share2 className="mr-2 h-5 w-5" /> Share
                    </Button> */}
                    <FacebookShareButton url={shareUrl}>
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                        url={shareUrl}
                        title={title}
                    >
                        <XIcon size={32} round />
                    </TwitterShareButton>
                    <LinkedinShareButton url={shareUrl} className="Demo__some-network__share-button">
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    <TelegramShareButton
                        url={shareUrl}
                        title={title}
                        className="Demo__some-network__share-button"
                    >
                        <TelegramIcon size={32} round />
                    </TelegramShareButton>
                    <WhatsappShareButton
                        url={shareUrl}
                        title={title}
                        separator=":: "
                    >
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                </CardFooter>
            </Card>

            <Card className="mb-8 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-primary">Comments</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="mb-2"
                    />
                    <Button onClick={handleAddComment} className="w-full bg-primary text-white hover:bg-primary/90">
                        Post Comment
                    </Button>
                </CardContent>
            </Card>

            <div className="space-y-4">
                {allComments?.map((comment: any) => (
                    <Card key={comment.id} className="shadow">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Avatar className="h-6 w-6 mr-2">
                                        <AvatarImage src={comment?.user?.profileImg} alt={comment?.user?.name} />
                                        <AvatarFallback>{comment?.user?.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-semibold text-secondary">{comment?.user?.name}</span>
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
                                    className="mb-2"
                                />
                            ) : (
                                <p className="text-body">{comment?.comment}</p>
                            )}
                        </CardContent>
                        <CardFooter className={`${currentUser?._id === comment?.user?._id ? 'flex justify-end' : 'hidden'} space-x-1`}>
                            {!showEditCommentBox && (
                                <Button variant={"ghost"} onClick={() => setShowEditCommentBox(true)}>
                                    <Edit2 className="h-4 w-4 mr-1" />
                                </Button>
                            )}
                            <Button variant="ghost" onClick={() => handleEditComment(comment._id)}>
                                {showEditCommentBox && 'Save'}
                            </Button>
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