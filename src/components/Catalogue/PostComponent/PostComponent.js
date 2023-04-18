import { CloudinaryImage } from "@cloudinary/url-gen";
import { URLConfig } from "@cloudinary/url-gen";
import { CloudConfig } from "@cloudinary/url-gen";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const PostComponent = ({ email, ownerId, postText, createdOn, postId }) => {
    const [postImageExists, setPostImageExists] = useState(false);
    const [profileImageExists, setProfileImageExists] = useState(false);


    let cloudConfig = new CloudConfig({ cloudName: 'dj5j9cqc0' });
    let urlConfig = new URLConfig({ secure: true });
    let postImage = new CloudinaryImage(`meetopia/${ownerId}/posts/${postId}`, cloudConfig, urlConfig);
    let postImageUrl = postImage.toURL();
    let profileImage = new CloudinaryImage(`meetopia/${ownerId}/profile-picture/profile-${ownerId}`, cloudConfig, urlConfig);
    let profileImageUrl = profileImage.toURL();

    useEffect(() => {
        fetch(postImageUrl)
            .then(response => {
                setPostImageExists(response.ok);
            })
            .catch(() => {
                setPostImageExists(false);
            });
    }, [postImageUrl]);

    useEffect(() => {
        fetch(profileImageUrl)
            .then(response => {
                setProfileImageExists(response.ok);
            })
            .catch(() => {
                setProfileImageExists(false);
            });
    }, [profileImageUrl]);

    const date = new Date(createdOn);
    const dateString = date.toLocaleString();

    return (
        <article className="post">
            <div className="user-box">
                <img
                    className="username-pic"
                    src={profileImageExists ? (profileImageUrl) : ("/imgs/profile.png")}
                    alt="profile-img" />
                <h2 className="post-username">{email}</h2>
                <span>created on: {dateString}</span>
            </div>
            <div className="post-box">
                {postImageExists && (<img src={postImageUrl} alt="post-img" />)}
                <span>{postText}
                </span>
                <Link to={`/posts/${postId}`} className="post-btn"> See All </Link>
            </div>
        </article>
    )
}

export default PostComponent;