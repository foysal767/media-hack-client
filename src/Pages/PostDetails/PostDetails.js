import { ChatBubbleLeftEllipsisIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';

const PostDetails = () => {
    const { post, img, like, _id } = useLoaderData()
    const [likeCount, setLikeCount] = useState(like)

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
                }
            })
    }
    console.log(post)
    return (
        <div className='my-12'>
            <div className="w-10/12 mx-auto shadow-md mb-10 py-12 bg-teal-200 rounded-xl">
                <div className="w-10/12 mx-auto bg-white py-8 rounded-xl">
                    <div className="w-8/12 mx-auto">
                        <img src={img} alt="" className="w-3/4 mx-auto rounded-md h-72 dark:bg-gray-500" />
                    </div>
                    <div className="w-3/4 mx-auto space-y-2 text-center mt-8 mb-2">
                        <p className='text-left pb-10 text-lg'>{post}</p>
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
                        <p className='my-2 text-left'>20 comments</p>
                    </div>
                    <hr className='w-3/4 mx-auto' />
                    <div className='w-6/12 mx-auto flex justify-between my-2'>
                        <button onClick={() => handleLike(_id)} className='focus:text-blue-500'>
                            <HandThumbUpIcon className="h-6 w-6 " />
                        </button>
                        <button className='flex justify-between items-center'><ChatBubbleLeftEllipsisIcon className='w-5' />Comment</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;