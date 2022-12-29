import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Login = () => {

    const { login, providerLogin } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider()
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/'

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then(res => {
                const user = res.user;
                console.log(user)
                navigate(from, { replace: true })
            })
            .catch(err => console.error(err))

    }

    const handleGoogleLogIn = () => {
        providerLogin(googleProvider)
            .then(res => {
                const user = res.user;
                console.log(user)
                navigate(from, { replace: true })
            })
            .catch(err => console.error(err))
    }

    return (
        <div className="hero w-full my-20">
            <div className="w-10/12 hero-content bg-teal-200 rounded-xl py-12">
                <div className="card w-full max-w-sm shadow-2xl bg-white rounded-xl py-6">
                    <h1 className="text-5xl text-center font-bold">Log In</h1>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6 w-1/2 mx-auto">
                            <input type="submit" className="btn border-0" style={{ backgroundColor: '#26A69A' }} value="Log In" />
                        </div>
                    </form>
                    <p className='text-center'>New to mediaHack? <Link className='text-teal-400 font-bold' to='/signup'>Sign Up</Link></p>
                    <div className='w-full text-center mx-auto mt-2'>
                        <div className="divider">OR</div>
                        <button onClick={handleGoogleLogIn} className="btn btn-outline btn-accent px-12">Cotinue With Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;