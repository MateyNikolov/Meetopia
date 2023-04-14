import { useContext, useState } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';
import { request as requester } from '../../services/requester';
import './Create.css';
import { AuthContext } from '../../contexts/authContext';

const Create = () => {
    const [formData, setFormData] = useState(new FormData());
    const [postText, setPostText] = useState('');
    const [image, setImage] = useState(false);
    const [postId, setPostId] = useState('');

    const { auth } = useContext(AuthContext);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        formData.append('file', file);
        formData.append('upload_preset', 'f6pccyxv');
        formData.append('folder', `meetopia/${auth._id}`);
        setFormData(formData);
        setImage(true);
    };

    const handlePostTextChange = (event) => {
        setPostText(event.target.value);
    };

    const handlePostSubmit = async (event) => {
        const postUrl = 'http://localhost:3030/data/posts';
        event.preventDefault();

        try {
            const result = await requester(postUrl, 'POST', { 'Post-Text': postText }, auth.accessToken);
            setPostId(result._id);
            formData.append('public_id', postId);
            console.log(postId);
            if (image) {
                await fetch(`https://api.cloudinary.com/v1_1/dj5j9cqc0/image/upload`, {
                    method: 'POST',
                    body: formData,
                })
            };
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="new-post post">
            <div>
                <form className="new-post-form" onSubmit={handlePostSubmit}>
                    <label className="headings" htmlFor="post-text">
                        Your Post :
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
                    <label className="post-img" htmlFor="post-img">
                        Want to add image to your post? Click me!
                        <input
                            hidden="true"
                            id="post-img"
                            name="post-img"
                            type="file"
                            onChange={handleImageUpload}
                        />
                    </label>
                    <button type="submit" className="post-btn create-btn">
                        Create Post
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Create;
