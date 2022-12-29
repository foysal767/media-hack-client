import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '../Shared/Loading/Loading';
import AboutCard from './AboutCard';
import AboutEdit from './AboutEdit/AboutEdit';

const About = () => {
    const [aboutEdit, setAboutEdit] = useState(null)
    const { data: details, isLoading, refetch } = useQuery({
        queryKey: ["details"],
        queryFn: async () => {
            const res = await fetch("https://media-social-server.vercel.app/about")
            const data = await res.json()
            return data
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <section>
            <div className='w-10/12 mx-auto bg-teal-200 rounded-xl my-12 py-12'>
                {
                    details?.map(about => <AboutCard
                        key={about._id}
                        about={about}
                        setAboutEdit={setAboutEdit}
                    ></AboutCard>)

                }
            </div>
            {
                aboutEdit &&
                <AboutEdit
                aboutEdit={aboutEdit}
                setAboutEdit={setAboutEdit}
                ></AboutEdit>
            }
        </section>
    );
};

export default About;