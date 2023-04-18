import { useContext, useState, useEffect } from "react";
import { request as requester } from "../../../services/requester";
import { AuthContext } from "../../../contexts/authContext";
import { useParams } from "react-router-dom";
import Comment from "./Comment/Comment";

const CommentSection = ({setAllComments}) => {
    const { auth } = useContext(AuthContext);
    const [commentText, setComment] = useState('');
    const [commentsList, setCommentsList] = useState([]);
    
    const { postId } = useParams();

    const handleCommentTextChange = (event) => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = async (event) => {
        const commentUrl = `http://localhost:3030/data/comments`;
        event.preventDefault();
        try {
            const result = await requester(commentUrl, 'POST', { commentText: commentText, postId: postId, email: auth.email }, auth.accessToken);
            if (result.status) {
                throw result.status;
            } else {
                setCommentsList(state => [...state, result]);
                setAllComments(state => state + 1);
                setComment('');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getAllComments = async () => {
        const currPostUrl = encodeURIComponent(`postId="${postId}"`);
        const commentUrl = `http://localhost:3030/data/comments?where=${currPostUrl}`
        console.log(commentUrl);
        try {
            const result = await requester(commentUrl, 'GET');
            if (result.status) {
                throw result.status;
            } else {
                setCommentsList(result)
            }
        } catch (error) {
            setCommentsList([]);
        }
    };


    useEffect(() => {
        getAllComments();
    }, []);


    return (
        <section className="comment-section">
            {commentsList.map(x =>
                <Comment
                    key={x._id}
                    email={x.email}
                    ownerId={x._ownerId}
                    commentText={x.commentText}
                    createdOn={x._createdOn}
                />
            )}

            {commentsList.length === 0 && (
                <div className="no-comments">
                    <h3 className="headings"> No comments yet..</h3>
                </div>
            )}

            <div className="write-comment" id="write-comment">
                <h2 className="comment-heading">Your Comment:</h2>
                <form className="comment-form" onSubmit={handleCommentSubmit} action="post">
                    <textarea value={commentText} onChange={handleCommentTextChange} placeholder="What are your thoughts about it? Tell us..." className="comment-text"
                        name="comment-text" id="comment-text" cols="80" rows="5"></textarea>
                    <button type="submit" className="post-btn comment-btn">Post Comment</button>
                </form>

            </div>

        </section>
    );
};


export default CommentSection;