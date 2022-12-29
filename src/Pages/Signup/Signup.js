import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Signup = () => {
    const { createUser, updateUser, providerLogin } = useContext(AuthContext)

    const googleProvider = new GoogleAuthProvider();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signUpError, setSignUpError] = useState('')
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const handleGoogleLogIn = () => {
        providerLogin(googleProvider)
            .then(res => {
                const user = res.user;
                console.log(user)
                navigate(from, { replace: true })
            })
            .catch(e => console.error(e))
    }
    const handleSignUp = data => {
        console.log(data)
        setSignUpError('')
        createUser(data.email, data.password)
            .then(res => {
                const user = res.user
                console.log(user)
                toast.success("User Created Successfully")
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email)
                    })
                    .catch(e => {
                        console.log(e)
                        setSignUpError(e.message)
                    })
            })
        navigate(from, { replace: true })
    }
    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('https://media-social-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'COntent-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data, 'Save User')
                setCreatedUserEmail(email)
            })
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-10/12 hero-content bg-teal-200 rounded-xl py-12'>
                <div className='card w-full max-w-sm shadow-2xl bg-white rounded-xl py-6'>
                    <h2 className='text-5xl text-center font-bold'>Signup</h2>
                    <form onSubmit={handleSubmit(handleSignUp)} className="card-body">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input type='text'
                                {...register("name", {
                                    required: "Name is Required"
                                })}
                                className="input input-bordered w-full max-w-xs"
                            />
                            {errors.name && <p className='text-error'>{errors.name?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type='email'
                                {...register("email", { required: "Email address is required" })}
                                className="input input-bordered w-full max-w-xs"
                            />
                            {errors.email && <p className='text-error'>{errors.email?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Password</span></label>
                            <input type='password'
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be 6 characters long" },
                                    pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: "Password must be minimum 1 uppercase, lowercase and number" }
                                })}
                                className="input input-bordered w-full max-w-xs" />
                            {errors.password && <p className='text-error'>{errors.password?.message}</p>}
                        </div>
                        <input className='w-1/2 mx-auto btn border-0 mt-4' style={{backgroundColor: '#26A69A'}} value='Signup' type="submit" />
                        {
                            signUpError && <p className='text-error text-center mt-2'>{signUpError}</p>
                        }
                    </form>
                    <p className='text-center'>Already have an account? <Link className='text-teal-400 font-bold' to='/login'>Please Login</Link> </p>
                    <div className="divider">OR</div>
                    <button onClick={handleGoogleLogIn} className='w-3/4 mx-auto btn btn-outline btn-accent px-12'>CONTINUE WITH GOOGLE</button>
                </div>
            </div>

        </div>
    );
};

export default Signup;