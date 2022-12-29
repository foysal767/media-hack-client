import { PencilSquareIcon } from '@heroicons/react/24/solid';
import React from 'react';

const AboutCard = ({ about, setAboutEdit }) => {
    const { name, email, institute, address } = about;

    return (
        <div>
            <div className='w-1/4 ml-auto my-4 card-actions'>
                <label
                    htmlFor="about-modal"
                    className='text-sky-800 btn btn-ghost'
                    onClick={() => setAboutEdit(about)}
                >
                    <PencilSquareIcon className='text-sky-800' />Edit
                </label>
            </div>
            <div className='w-8/12 mx-auto text-left card-body bg-white rounded-xl p-6'>
                <h1 className='text-3xl font-semibold'>Name: {name}</h1>
                <h3 className='text-xl'>Email: {email}</h3>
                <h3 className='text-xl'>Institute: {institute}</h3>
                <h3 className='text-xl'>Address: {address}</h3>
            </div>
        </div>
    );
};

export default AboutCard;