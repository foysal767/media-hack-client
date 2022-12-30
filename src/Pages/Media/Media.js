import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../Shared/Loading/Loading';
import AllPostCard from './AllPostCard';

const Media = () => {
    const { data: allPost, isLoading, refetch } = useQuery({
        queryKey: ['popularPost'],
        queryFn: async () => {
            try {
                const res = await fetch('https://media-social-server.vercel.app/allpost')
                const data = await res.json()
                return data
            }
            catch (error) {
                console.log(error)
            }
            refetch()
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    
    return (
        <section className='w-10/12 mx-auto rounded-xl my-12 bg-teal-200 py-8'>
            <h1 className='text-3xl font-semibold mb-8'>All Posts Are Here</h1>
            <div className='w-10/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                {
                    allPost?.map(singlePost => <AllPostCard
                        key={singlePost._id}
                        singlePost={singlePost}
                        refetch={refetch}
                    ></AllPostCard>)
                }
            </div>
        </section>
    );
};

export default Media;