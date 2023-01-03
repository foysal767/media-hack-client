import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const CommentModal = ({commentState, setCommentState, _id, refetch}) => {
    const {user} = useContext(AuthContext)
    const handleComment = e =>{
        e.preventDefault()
        const form = e.target;
        const commentingValue = form.comment.value;
        console.log(commentingValue)
        const comments = {
            id: _id,
            name: user?.displayName,
            comment: commentingValue
        }
        fetch("https://media-social-server-foysal767.vercel.app/comments", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comments)
        })
        .then(res => res.json())
        .then(result => {
            toast.success("Comments Added")
            setCommentState(null)
            refetch()
        })

    }
    return (
        <>
            <input type="checkbox" id="comment-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="comment-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form className='grid grid-cols-1 gap-3 mt-10' onSubmit={handleComment} >
                        <input type="text" name='comment'  className="input w-full input-bordered" required />
                        <input className='btn btn-success w-1/2 mx-auto' type="submit" value='Comment' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default CommentModal;