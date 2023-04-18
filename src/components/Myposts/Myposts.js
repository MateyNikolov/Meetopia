import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import './Myposts.css';
import { Link } from 'react-router-dom';
import MyPost from './MyPost/MyPost';

const Myposts = () => {
    const [posts, setPosts] = useState([]);
    const { auth } = useContext(AuthContext);

    const getMyPosts = async () => {
        const owner = encodeURIComponent(`_ownerId="${auth._id}"`)
        const url = `http://localhost:3030/data/posts?where=${owner}`;
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
        getMyPosts();
    }, []);

    return (
        <div className='my-posts'>

            {posts.map(x =>
                <MyPost getMyPosts={getMyPosts} key={x._id} user={auth} postDate={x._createdOn} postId={x._id} postText={x.postText} />
            )}

            {posts.length === 0 && (
                <div className='empty-page'>
                    <h3 className="headings">You dont have any posts yet.. </h3>
                    <Link className="headings" to="/new">Make your first</Link>
                </div>
            )}

        </div>
    );
};

export default Myposts;