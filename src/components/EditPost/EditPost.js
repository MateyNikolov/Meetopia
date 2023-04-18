import { useParams, useNavigate } from "react-router-dom";
import { request as requester } from "../../services/requester";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

const EditPost = () => {
    const { auth } = useContext(AuthContext);
    const [ postText, setPostText ] = useState('');
    const { postId } = useParams();
    const navigate = useNavigate();

    const handlePostTextChange = (event) => {
        setPostText(event.target.value);
    };

    useEffect( () => {
        const url = `http://localhost:3030/data/posts/${postId}`;
        requester(url, 'GET').then(result => setPostText(result.postText));
    }
    , [])

    const handlePostSubmit = async (event) => {
        const postUrl = `http://localhost:3030/data/posts/${postId}`;
        event.preventDefault();

        try {
            await requester(postUrl, 'PUT', { postText : postText, email: auth.email }, auth.accessToken);
            navigate('/my-posts');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="new-post post">
            <div>
                <form className="new-post-form" onSubmit={handlePostSubmit}>
                    <label className="headings" htmlFor="post-text">
                        Edit Your Post :
                    </label>
                    <textarea
                        placeholder="Got some new thoughts to share?.."
                        className="comment-text post-text"
                        name="post-text"
                        id="post-text"
                        cols="60"
                        rows="6"
                        required
                        onChange={handlePostTextChange}
                        value={postText}
                    ></textarea>
                    <button type="submit" className="post-btn create-btn">
                        Edit Post
                    </button>
                </form>
            </div>
        </section>
    );
};


export default EditPost;