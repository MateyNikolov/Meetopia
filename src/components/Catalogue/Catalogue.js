import { Link } from 'react-router-dom';
import './Catalogue.css';
import PostComponent from './PostComponent/PostComponent';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';

const Catalogue = () => {
    const [posts, setPosts] = useState([]);
    const { auth } = useContext(AuthContext);

    const getAllPosts = async () => {
        const url = "http://localhost:3030/data/posts";
        const result = await fetch(url, {
            method: "GET",
        })

        const data = await result.json();
        if (data.code === 404 || data.length < 1) {
            setPosts([]);
        } else {
            setPosts(data.reverse());
        }
    }


    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <div className='posts'>



            {posts.map(x =>
                <PostComponent
                    key={x._id}
                    email={x.email}
                    ownerId={x._ownerId}
                    postText={x.postText}
                    createdOn={x._createdOn}
                    postId={x._id}
                />
            )}

            {posts.length === 0 && (
                <div className='empty-page'>
                    <h3 className="headings"> Nobody has posted something..</h3>
                    <Link className="headings" to="/new"> Be the first </Link>
                </div>
            )}

        </div>
    );
};

export default Catalogue;
