import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Shared/Loading/Loading';

const AllPostCard = ({ singlePost }) => {
    const { post, img, like, author, _id } = singlePost;
    const { data: comments, isLoading, refetch } = useQuery({
        queryKey: ["comments", _id],
        queryFn: async () => {
            try {
                const res = await fetch(`https://media-social-server-foysal767.vercel.app/comments/${_id}`)
                const data = await res.json()
                return data
            }
            catch (error) {
                console.log(error)
            }
        }
    })
    console.log(`${_id}`, comments)
    if (isLoading) {
        return <Loading></Loading>
    }
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
                    refetch()
                }
            })
    }
    return (
        <div className="card lg:card-side shadow-xl p-6 border border-gray-200 bg-white">
            <div className='card'>
                {
                    author ?
                        <h4 className='text-lg font-medium text-left mb-2  p-1 rounded-xl'>{author}</h4>
                        :
                        <h4 className='text-lg font-medium text-left mb-2  p-1 rounded-xl'>No Name Found</h4>
                }
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
                    {
                        comments?.length >= 1 ?
                            <p>{comments?.length} comments</p>
                            :
                            <p>No Comment</p>
                    }
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