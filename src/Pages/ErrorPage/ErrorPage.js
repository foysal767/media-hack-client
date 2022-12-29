import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='w-10/12 mx-auto my-auto h-10/12 max-w-md text-center'>
            <img src="https://img.freepik.com/free-vector/internet-network-warning-404-error-page-file-found-web-page-internet-error-page-issue-found-network-404-error-present-by-man-sleep-display_1150-55450.jpg?w=740&t=st=1669437728~exp=1669438328~hmac=fb77d458b2aa3e16504e635f71c1023277329052dd010198bfcab20f67d2f01f" alt="" />
            <div>
                <Link to='/'><button className='text-white btn-accent rounded-xl px-6 py-4'>GO BACK HOME</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;