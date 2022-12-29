import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(e => console.log(e))
    }
    const menuItems = <React.Fragment>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/media'>Media</Link></li>
        <li><Link to='/message'>Message</Link></li>
        <li><Link to='/about'>About</Link></li>

        {
            user?.uid ?
                <li><button onClick={handleLogOut}>Sign Out</button></li>
                :
                <li><Link to='/login'>Login</Link></li>
        }
    </React.Fragment>
    return (
        <div className="w-10/12 mx-auto navbar flex justify-between bg-teal-400 rounded-b-xl sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 text-teal-500 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-white font-bold text-xl"><img className='w-6' src="https://i.pinimg.com/originals/19/6c/a5/196ca566fb772a3b736ddaf3725a0483.jpg" alt="" />mediaHack</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0 text-white">
                    {menuItems}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;