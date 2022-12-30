import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ pPost }) => {
    const { post, img, like, author } = pPost
    return (
        <div className="card lg:card-side shadow-xl p-6 border border-gray-200 bg-white">
            <div className='card'>
                {
                    author ?
                    <h4 className='w-8/12 text-lg font-medium text-left mb-2  p-1 rounded-xl'>{author}</h4>
                    :
                    <h4 className='w-8/12 text-lg font-medium text-left mb-2  p-1 rounded-xl'>No Name Found</h4>
                }
                <div className='h-44 rounded-md'>
                    <figure className='w-10/12 mx-auto h-44'><img src={img} alt="Album" /></figure>
                </div>
                <div className="my-auto text-left mt-4">
                    {
                        post?.length > 100 ?
                            <p>{post?.slice(0, 100)}...</p>
                            :
                            <p>{post}</p>
                    }
                </div>
                <div className='my-4'>
                    <hr />
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
                    <hr />
                </div>
                <Link to={`/details/${pPost._id}`}><button className='btn btn-info'>Details</button></Link>
            </div>
        </div >
    );
};

export default PostCard;