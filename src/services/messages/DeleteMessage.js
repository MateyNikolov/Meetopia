import './AlertMessage.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect } from 'react';

import { request as requester } from '../requester';

const DeleteMessage = ({ onClose, postId, auth, getMyPosts }) => {

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleDeletePost = async () => {
        const url = `http://localhost:3030/data/posts/${postId}`;
        await requester(url, 'DELETE', {}, auth.accessToken);
        getMyPosts();
        onClose();
    };

    return (
        <div className="popup-container">
            <div className="popup">
                <div className="popup-inner">
                    <div className="popup-message">Are you sure you want to delete this post?</div>
                    <div className="buttons">
                        <button onClick={handleDeletePost} className="post-btn delete-yes-btn">Yes</button>
                        <button onClick={onClose} className="post-btn delete-no-btn">No</button>
                    </div>
                    <button className="popup-close post-btn" onClick={onClose}>
                        X
                    </button>
                </div>
            </div>
        </div>
    );
};


export const deleteAlert = (postId, auth, getMyPosts) => {
    const alert = document.createElement('div');
    alert.setAttribute('id', 'alert');
    document.body.appendChild(alert);
    ReactDOM.createRoot(alert).render(
        <DeleteMessage getMyPosts={getMyPosts} postId={postId} auth={auth} onClose={() => alert.remove()} />
    );
}