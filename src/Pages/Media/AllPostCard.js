import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AllPostCard = ({ singlePost, refetch }) => {
    const { post, img, like } = singlePost;
    const handleLike = id => {
        const likes = {
            like: like + 1
        }
        fetch(`http://localhost:5000/allPost/${id}`, {
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
                    refetch()
                }
            })
    }

    return (
        <div className="card lg:card-side shadow-xl p-6 border border-gray-200 bg-white">
            <div className='card'>
                <div className='h-44 rounded-md'>
                    <figure className='w-10/12 mx-auto h-44'><img src={img} alt="Album" /></figure>
                </div>
                <div className="text-left my-4">
                    {
                        post?.length > 100 ?
                            <p>{post?.slice(0, 100)}...</p>
                            :
                            <p>{post}</p>
                    }
                </div>
                <hr />
                <div className='w-10/12 mx-auto flex justify-between my-2'>
                    {
                        like ?
                            <>
                                {
                                    like > 1 &&
                                    <p className='my-2 text-left'>{`${like} likes`}</p>
                                }
                                {
                                    like === 1 &&
                                    <p className='my-2 text-left'>{`${like} like`}</p>
                                }
                            </>
                            :
                            <p>No like Yet</p>
                    }
                    <p className='my-2 text-left'>20 comments</p>
                </div>
                <hr />
                <div className='w-10/12 mx-auto flex justify-between my-2'>
                    <button onClick={() => handleLike(singlePost._id)} className='focus:text-blue-500'>
                        <HandThumbUpIcon className="h-6 w-6 " />
                    </button>
                    <button className='flex justify-between items-center'><ChatBubbleLeftEllipsisIcon className='w-5' />Comment</button>
                </div>
                <Link to={`/details/${singlePost._id}`}><button className='btn btn-info mt-2'>Details</button></Link>
            </div>
        </div>
    );
};

export default AllPostCard;