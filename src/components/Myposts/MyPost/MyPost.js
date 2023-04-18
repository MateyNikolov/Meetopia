import { CloudinaryImage } from "@cloudinary/url-gen";
import { URLConfig } from "@cloudinary/url-gen";
import { CloudConfig } from "@cloudinary/url-gen";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteAlert } from "../../../services/messages/DeleteMessage";


const MyPost = ({
    user,
    postDate,
    postText,
    postId,
    getMyPosts,
}) => {
    const [imageExists, setImageExists] = useState(false);
    const [onClose, setOnClose] = useState(null);

    let cloudConfig = new CloudConfig({ cloudName: 'dj5j9cqc0' });
    let urlConfig = new URLConfig({ secure: true });
    let myImage = new CloudinaryImage(`meetopia/${user._id}/posts/${postId}`, cloudConfig, urlConfig);
    let imageUrl = myImage.toURL();

    const date = new Date(postDate);
    const dateString = date.toLocaleString(); 

    const handleDeleteClick = () => {
        const onClose = deleteAlert(postId, user, getMyPosts);
        setOnClose(onClose);
    };

    useEffect(() => {
        return () => {
            if (onClose) {
                onClose();
            }
        };
    }, [onClose]);


    useEffect(() => {
        fetch(imageUrl)
            .then(response => {
                setImageExists(response.ok);
            })
            .catch(() => {
                setImageExists(false);
            });
    }, [imageUrl]);

    return (
        <article className="post">
            <div className="user-box">
                <img className="username-pic" src={!user.picture ? ("/imgs/profile.png") : (user.picture)} alt="profile-img" />
                <h2 className="post-username">{user.email}</h2>
                <span>created on: {dateString}</span>
            </div>
            <div className="post-box">
                {imageExists && (<img src={imageUrl} alt="post-img" />)}
                <span>{postText}
                </span>
                <div className="mypost-btns">
                    <Link to={`/my-posts/${postId}/edit`} className="post-btn">Edit Post</Link>
                    <button onClick={handleDeleteClick} className="post-btn delete-btn">Delete Post</button>
                </div>
            </div>
        </article>
    );
}

export default MyPost;