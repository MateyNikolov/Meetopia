import { CloudinaryImage } from "@cloudinary/url-gen";
import { URLConfig } from "@cloudinary/url-gen";
import { CloudConfig } from "@cloudinary/url-gen";

import './PostDetails.css';

import { useState, useEffect, useContext } from 'react';

import { useParams, Link } from "react-router-dom";

import { AuthContext } from "../../contexts/authContext";
import { request as requester } from "../../services/requester";
import CommentSection from "./CommentSection/CommentSection";

const PostDetails = () => {
    const { auth, isAuthenticated } = useContext(AuthContext);
    const { postId } = useParams();
    const [postImageExists, setPostImageExists] = useState(false);
    const [profileImageExists, setProfileImageExists] = useState(false);
    const [currentPost, setCurrentPost] = useState({});
    const [currentUserLike, setCurrentUserLike] = useState(false);
    const [postLikes, setPostLikes] = useState(0);
    const [allComments, setAllComments] = useState(0);

    const getCurrentPost = async () => {

        const url = `http://localhost:3030/data/posts/${postId}`;
        const result = await fetch(url, {
            method: "GET",
        })

        const data = await result.json();
        if (data.code === 404 || data.length < 1) {
            setCurrentPost({});
        } else {
            setCurrentPost(data);
        }
    };

    const getCurrentUserLikes = async () => {

        const currPostAndOwnerId = encodeURIComponent(`postId="${postId}" and _ownerId="${auth._id}"`);
        const url = `http://localhost:3030/data/likes?where=${currPostAndOwnerId}`;
        const result = await fetch(url, {
            method: "GET",
        })

        const data = await result.json();
        if (data.code === 404 || data.length < 1) {
            setCurrentUserLike(false);
        } else {
            setCurrentUserLike(true);
        }

        return currentUserLike;
    };

    const getAllPostLikes = async () => {
        const currPostUrl = encodeURIComponent(`postId="${postId}"`);
        const url = `http://localhost:3030/data/likes?where=${currPostUrl}`;

        const result = await fetch(url, {
            method: "GET",
        })

        const data = await result.json();
        if (data.code === 404 || data.length < 1) {
            setPostLikes(0);
        } else {
            setPostLikes(data.length);
        }

    }

    const getAllComments = async () => {
        const currPostUrl = encodeURIComponent(`postId="${postId}"`);
        const commentUrl = `http://localhost:3030/data/comments?where=${currPostUrl}`
        try {
            const result = await requester(commentUrl, 'GET');
            if (result.status) {
                throw result.status;
            } else {
                setAllComments(result.length)
            }
        } catch (error) {
            setAllComments(0);
        }
    };

    useEffect(() => {
        getCurrentUserLikes();
    }, [])

    useEffect(() => {
        getAllPostLikes();
    }, [])

    useEffect(() => {
        getAllComments();
    }, [allComments])


    const onLikeSubmit = async () => {
        const url = `http://localhost:3030/data/likes/`
        const result = await requester(url, "POST", { postId: postId }, auth.accessToken);
        setCurrentUserLike(true);
        getAllPostLikes();
    };

    useEffect(() => {
        getCurrentPost();
    }, [postId])

    let cloudConfig = new CloudConfig({ cloudName: 'dj5j9cqc0' });
    let urlConfig = new URLConfig({ secure: true });
    let postImage = new CloudinaryImage(`meetopia/${currentPost._ownerId}/posts/${postId}`, cloudConfig, urlConfig);
    let postImageUrl = postImage.toURL();
    let profileImage = new CloudinaryImage(`meetopia/${currentPost._ownerId}/profile-picture/profile-${currentPost._ownerId}`, cloudConfig, urlConfig);
    let profileImageUrl = profileImage.toURL();

    fetch(postImageUrl)
        .then(response => {
            setPostImageExists(response.ok);
        })
        .catch(() => {
            setPostImageExists(false);
        });
    fetch(profileImageUrl)
        .then(response => {
            setProfileImageExists(response.ok);
        })
        .catch(() => {
            setProfileImageExists(false);
        });

    const date = new Date(currentPost._createdOn);
    const dateString = date.toLocaleString();

    return (
        <article className="post">
            <div className="user-box">
                <img className="username-pic" src={profileImageExists ? (profileImageUrl) : ("/imgs/profile.png")} alt="profile-img" />
                <h2 className="post-username">{currentPost.email}</h2>
                <span>created on: {dateString}</span>
            </div>
            <div className="see-all-post-box">
                {postImageExists && (<img src={postImageUrl} alt="post-img" />)}
                <span>{currentPost.postText}
                </span>
            </div>
            <div className="likes">
                <span>Likes: {postLikes}</span>
                <span>Comments: {allComments}</span>
            </div>
            <div className="see-all-btns">
                {(auth._id === currentPost._ownerId) ? (
                    <>
                        <Link to={`/my-posts/${postId}/edit`} className="post-btn">Edit</Link>
                    </>
                ) : ('')}
                {isAuthenticated() ? (
                    <>
                        {!currentUserLike ? (
                            <button onClick={onLikeSubmit} className="post-btn"><i className="fas fa-thumbs-up"></i>Like It</button>
                        ) : ('')}
                        <a href="#write-comment" className="post-btn">Comment It</a>
                    </>
                ) : ('')}
            </div>
            {isAuthenticated() ? (
                <CommentSection setAllComments={setAllComments}/>
            ) : ('')}
        </article>
    );
};

export default PostDetails;