import { CloudinaryImage } from "@cloudinary/url-gen";
import { URLConfig } from "@cloudinary/url-gen";
import { CloudConfig } from "@cloudinary/url-gen";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/authContext";

const Comment = ({email, ownerId, commentText, createdOn}) => {
    const { auth } = useContext(AuthContext);
    const [profileImageExists, setProfileImageExists] = useState(false);

    
    let cloudConfig = new CloudConfig({ cloudName: 'dj5j9cqc0' });
    let urlConfig = new URLConfig({ secure: true });
    let profileImage = new CloudinaryImage(`meetopia/${ownerId}/profile-picture/profile-${ownerId}`, cloudConfig, urlConfig);
    let profileImageUrl = profileImage.toURL();

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
        <div className="comment">
                <div className="comment-owner">
                    <div className="user">
                        <img className="username-pic" src={profileImageExists ? (profileImageUrl) : ("/imgs/profile.png")} alt="profile-img" />
                        <h3>{email}</h3>
                    </div>
                    <span>posted on: {dateString}</span>
                </div>
                <span className="comment-content">{commentText}
                </span>
                <p></p>
            </div>
    );
};

export default Comment;