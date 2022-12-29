import React from 'react';
import PostCard from './PostCard';

const PopularPost = ({popularPost}) => {
    
    return (
        <section className='w-10/12 mx-auto rounded-xl my-12 bg-teal-200 py-8'>
            <h1 className='text-3xl font-semibold mb-8'>Most Popular Post</h1>
            <div className='w-10/12 mx-auto grid grid-cols-3 gap-4 mb-6'>
                {
                    popularPost.map(pPost => <PostCard
                    key={pPost._id}
                    pPost={pPost}
                    ></PostCard>)
                }
            </div>
        </section>
    );
};

export default PopularPost;