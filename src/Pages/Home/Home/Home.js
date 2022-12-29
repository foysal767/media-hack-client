import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import AddPost from '../AddPost/AddPost';
import Banner from '../Banner/Banner';
import PopularPost from '../PopularPost/PopularPost';

const Home = () => {
    const {data: popularPost, isLoading} = useQuery({
        queryKey: ['popularPost'],
        queryFn: async() => {
            try {
                const res= await fetch('https://media-social-server.vercel.app/popularpost')
                const data = await res.json()
                return data
            }
            catch(error){

            }
        }
    })

    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div>
            <AddPost></AddPost>
            <PopularPost popularPost={popularPost}></PopularPost>
        </div>
    );
};

export default Home;