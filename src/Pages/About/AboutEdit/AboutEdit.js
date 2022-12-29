import React from 'react';
import { toast } from 'react-hot-toast';

const AboutEdit = ({ aboutEdit, setAboutEdit, refetch }) => {
    const { name, email, institute, address, _id } = aboutEdit;
    console.log(aboutEdit);
    const handleEdit = e =>{
        e.preventDefault();
        const form = e.target;
        const address = form.address.value;
        const name = form.name.value;
        const email = form.email.value;
        const institute = form.institute.value;
        console.log(address, name, institute, email)
        const editedAbout = {
            name: name,
            email: email,
            institute: institute,
            address: address
        }
        fetch(`https://media-social-server.vercel.app/about/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedAbout)
        })
        .then(res => res.json())
        .then(data => {
            if(data?.modifiedCount > 0){
                toast.success("Edited Successfully")
                setAboutEdit(null)
                refetch()
            }
        })
    }
    return (
        <>
            <input type="checkbox" id="about-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="about-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form className='grid grid-cols-1 gap-3 mt-10' onSubmit={handleEdit}>
                        <input type="text" name='name' defaultValue={name} className="input w-full input-bordered" required />
                        <input type="email" name='email' defaultValue={email} className="input w-full input-bordered" required />
                        <input name='institute' type="text"
                            defaultValue={institute}
                            placeholder="Your Name" className="input w-full input-bordered" required />
                        <input name='address' type="text"
                            defaultValue={address}
                            placeholder="Email Address" className="input w-full input-bordered" required />
                        <input className='btn btn-success w-full' type="submit" value='Submit' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default AboutEdit;