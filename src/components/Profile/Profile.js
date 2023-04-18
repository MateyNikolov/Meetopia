import { useContext, useEffect, useState } from 'react';
import './Profile.css';

import { AuthContext } from '../../contexts/authContext';
import { Link } from 'react-router-dom';


const Profile = () => {
    const [formData, setFormData] = useState(new FormData());
    const { auth, setAuth } = useContext(AuthContext);
    const [posts, setPosts] = useState(0);

    const postCount = async () => {
        const owner = encodeURIComponent(`_ownerId="${auth._id}"`)
        const url = `http://localhost:3030/data/posts?where=${owner}`;
        const result = await fetch(url, {
            method: "GET",
        })

        const data = await result.json();
        if (data.code === 404 || data.length < 1) {
            setPosts(0);
        } else {
            setPosts(data.length);
        }
    }

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        formData.append('file', file);
        formData.append('upload_preset', 'f6pccyxv');
        formData.append('folder', `meetopia/${auth._id}/profile-picture`);
        formData.append('public_id', `profile-${auth._id}`);
        setFormData(formData);

        try {
            const result =
                await fetch(`https://api.cloudinary.com/v1_1/dj5j9cqc0/image/upload`, {
                    method: 'POST',
                    body: formData,
                })

            const resultData = await result.json();
            const uploadedPictureLink = resultData.secure_url;
            const newAuth = { ...auth, picture: uploadedPictureLink };
            setAuth(newAuth);

        } catch (error) {
            console.log(error);
        }

    };

    console.log(auth.picture);;

    useEffect(() => {
        postCount();
    },
        [])


    return (
        <section className="post">
            <h2 className="profile-username">{auth.email}</h2>
            <div className="profile">
                <img
                    className="profile-picture"
                    src={!auth.picture ? ("imgs/profile.png") : (auth.picture)}
                    alt="profile picture"
                />
                <div className="profile-info">
                    <h3>Age: {auth.age}</h3>
                    <h3>City: {auth.city}</h3>
                    <Link to="/my-posts">
                        <h3>Total Posts: {posts}</h3>
                    </Link>
                </div>
            </div>
            {!auth.picture ? (
                <label className="edit-profile" htmlFor="post-img">
                    Upload Picture
                    <input
                        hidden={true}
                        id="post-img"
                        name="post-img"
                        type="file"
                        onChange={handleImageUpload}
                    />
                </label>
            ) : ('')}
        </section>
    );
};

export default Profile;