import { PencilSquareIcon } from '@heroicons/react/24/solid';
import React from 'react';

const AboutCard = ({ about, setAboutEdit }) => {
    const { name, email, institute, address } = about;

    return (
        <div>
            <h2 className='text-3xl font-semibold'>About Me</h2>
            <div className='w-1/4 ml-auto my-4 card-actions'>
                <label
                    htmlFor="about-modal"
                    className='text-sky-800 btn btn-ghost'
                    onClick={() => setAboutEdit(about)}
                >
                    <PencilSquareIcon className='text-sky-800' />Edit
                </label>
            </div>
            <div className='w-10/12 md:w-8/12 mx-auto text-left card-body bg-white rounded-xl p-6'>
                <div className='text-sm md:text-lg border border-teal-300 p-4 my-2 rounded-xl'>
                    <label htmlFor="">Name:</label>
                    <h1 className='text-3xl font-semibold'>{name}</h1>
                </div>
                <div className='text-sm md:text-lg border border-teal-300 p-4 my-2 rounded-xl'>
                    <label htmlFor="">Email:</label>
                    <h3 className='text-base md:text-xl'>{email}</h3>
                </div>
                <div className='text-sm md:text-lg border border-teal-300 p-4 my-2 rounded-xl'>
                    <label htmlFor="">Institute:</label>
                    <h3 className='text-xl'>{institute}</h3>
                </div>
                <div className='text-sm md:text-lg border border-teal-300 p-4 my-2 rounded-xl'>
                    <label htmlFor="">Address:</label>
                    <h3 className='text-xl'>{address}</h3>
                </div>
            </div>
        </div>
    );
};

export default AboutCard;