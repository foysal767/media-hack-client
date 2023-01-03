import { ChatBubbleLeftEllipsisIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';
import CommentModal from './CommentModal';

const PostDetails = () => {
    const { post, img, like, _id, author } = useLoaderData()
    const [likeCount, setLikeCount] = useState(like)
    const [commentState, setCommentState] = useState(null)
    const [commentShow, setCommentShow] = useState(null)

    const { data: comments = [], isLoading, refetch } = useQuery({
        queryKey: ["comments", _id],
        queryFn: async () => {
            try {
                const res = await fetch(`https://media-social-server-foysal767.vercel.app/comments/${_id}`)
                const data = await res.json()
                return data
            }
            catch (error) {

            } refetch()
        }
    })


    const handleLike = id => {
        const likes = {
            like: like + 1
        }
        fetch(`https://media-social-server.vercel.app/allPost/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(likes)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('You Like This Post')
                    setLikeCount(like + 1)
                    // refetch()
                }
            })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <section>
            <div className='my-12'>
                <div className="w-10/12 mx-auto shadow-md mb-10 py-12 bg-teal-200 rounded-xl">
                    <div className="w-10/12 mx-auto bg-white py-8 rounded-xl">
                        <div className='w-8/12 mx-auto'>
                            {
                                author ?
                                    <h4 className='text-lg font-medium text-left mb-2  p-1 rounded-xl'>{author}</h4>
                                    :
                                    <h4 className='text-lg font-medium text-left mb-2  p-1 rounded-xl'>No Name Found</h4>
                            }
                        </div>
                        <div className="w-8/12 mx-auto">
                            <img src={img} alt="" className="w-3/4 mx-auto rounded-md h-36 md:h-72" />
                        </div>
                        <div className="w-3/4 mx-auto space-y-2 text-center mt-8 mb-2">
                            <p className='text-left pb-6 text-lg'>{post}</p>
                        </div>
                        <hr className='w-3/4 mx-auto' />
                        <div className='w-6/12 mx-auto flex justify-between my-2'>
                            {
                                likeCount ?
                                    <>
                                        {
                                            likeCount > 1 &&
                                            <p className='my-2 text-left'>{`${likeCount} likes`}</p>
                                        }
                                        {
                                            likeCount === 1 &&
                                            <p className='my-2 text-left'>{`${likeCount} like`}</p>
                                        }
                                    </>
                                    :
                                    <p>No like Yet</p>
                            }
                            {
                                comments?.length >= 1 ?
                                    <p onClick={() => setCommentShow(comments)}>{comments?.length} comments</p>
                                    :
                                    <p>No Comment</p>
                            }
                        </div>
                        <hr className='w-3/4 mx-auto' />
                        <div className='w-6/12 mx-auto flex justify-between my-2'>
                            <button onClick={() => handleLike(_id)} className='focus:text-blue-500 btn glass text-black'>
                                <HandThumbUpIcon className="h-6 w-6 " />
                            </button>
                            <div>
                                <label htmlFor="comment-modal"
                                    className='flex justify-between items-center btn glass text-black border-0'
                                    onClick={() => setCommentState(_id)}
                                >
                                    <ChatBubbleLeftEllipsisIcon className='w-5' />Comment
                                </label>
                            </div>
                        </div>
                        <div className='w-6/12 mx-auto my-6 text-left'>
                            {
                                commentShow &&
                                comments?.map(comment => <div className='border border-slate-500 my-2 rounded-xl p-4 bg-gray-200'>
                                    <p className='font-medium'>{comment?.name}</p>
                                    <p>{comment?.comment}</p>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                commentState &&
                <CommentModal
                    commentState={commentState}
                    setCommentState={setCommentState}
                    refetch={refetch}
                    _id={_id}
                ></CommentModal>
            }
        </section>

    );
};

export default PostDetails;