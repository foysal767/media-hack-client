import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const imageHostingKey = "9b3ea6038c9c0753f3e8d7849b4d71fb";


    const handleAddPost = data => {
        console.log(imageHostingKey)
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url)
                    const post = {
                        post: data.post,
                        img: imgData.data.url,
                        like: 0
                    }
                    fetch("https://media-social-server.vercel.app/addpost", {
                        method: 'POSt',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(post)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result)
                            toast.success("Added Successfully")
                        })

                    navigate('/media')
                }
            })
        console.log(data, image)
    }
    return (
        <div className="w-10/12 mx-auto p-6 dark:bg-gray-800 dark:text-gray-50 bg-teal-200 rounded-xl my-12">
            <h1 className='text-3xl font-semibold mb-4'>Add Your Post</h1>
            <form onSubmit={handleSubmit(handleAddPost)} className="w-10/12 mx-auto">
                <div className='form-control w-1/2 mx-auto my-2'>
                    <label className="label"><span className="label-text">Write Yout Post Here</span></label>
                    <textarea type='text' defaultValue={""} className="w-10/12 textarea textarea-accent"
                        {...register("post", {
                            required: "Post is Required"
                        })}
                    ></textarea>
                    {errors.post && <p className='text-error mt-2'>{errors.post?.message}</p>}
                </div>
                <div className="form-control w-1/2 mx-auto col-span-full my-2">
                    <label className="label"><span className="label-text">Image</span></label>
                    <input type="file" defaultValue={""}
                        {...register("image", {
                            required: "Image is Required"
                        })}
                        className="file-input file-input-bordered file-input-info w-full max-w-xs" />
                    {errors.image && <p className='text-error mt-2'>{errors.image?.message}</p>}
                </div>
                <div className='mt-6'>
                    <input
                        className='btn btn-info' value='Submit'
                        type="submit" />
                </div>
            </form>
        </div>
    );
};

export default AddPost;