import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

const CommentCard = ({
                         commentID,
                         content,
                         contentTimestamp,
                         reviewID,
                         parentCommentID,
                         userID
                     }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [replies, setReplies] = useState([]);
    const [name, setName] = useState('');
    const [likes, setLikes] = useState(0);
    const [likeStatus, setLikeStatus] = useState(false);

    const handleShowReplies = () => {
        setShowReplies(!showReplies);
    };

    const handleLike = async () => {
        try {
            const newStatus = !likeStatus;
            const apiEndpoint = newStatus ? "/api/comments/like" : "/api/comments/delete-like";

            const response = await fetch(apiEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ commentID, userID }),
            });

            if (response.ok) {
                setLikes((prev) => prev + (newStatus ? 1 : -1));
                setLikeStatus(newStatus);
            }
        } catch (err) {
            console.error("Error updating like status:", err);
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`/api/comments/get-replies`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ commentID: commentID }),
                });
                const data = await response.json();
                setReplies(data.data);
            } catch (err) {
                console.error('Error fetching comments:', err);
            }
        };

        const fetchUserInformation = async () => {
            try {
                const response = await fetch("/api/users/get-user-info", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userID: userID }),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();
                setName(`${result.data.firstName} ${result.data.lastName}`);
            } catch (e) {
                console.error("Error retrieving user information:", e);
            }
        };

        const fetchLikes = async () => {
            try {
                const response = await fetch("/api/comments/get-comment-likes", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ commentID: commentID }),
                });

                if (response.ok) {
                   const data = await response.json();
                   setLikes((data.numLikes));
                } else {
                    console.error(`Error fetching comment likes: ${response.status}`);
                }

            } catch (e) {
                console.error("Error fetching comment likes:", e);
            }
        }

        const fetchLikeStatus = async () => {
            try {
                const response = await fetch("/api/comments/comment-liked-by-user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ commentID: commentID, userID: userID }),
                });
                const data = await response.json();
                if (response.ok && data.isLiked) {
                    setLikeStatus(true);
                    console.log("is Liked")
                } else {
                    setLikeStatus(false);
                    console.log("is not Liked")
                }
            } catch (e) {
                console.error("Error fetching comment likes:", e);
            }
        }

        fetchUserInformation();
        fetchComments();
        fetchLikes();
        fetchLikeStatus();
    }, [reviewID]);

    return (
        <div className="d-flex flex-start mb-4">
            <div className="card w-100" style={{
                backgroundColor: '#f4dfd0',
                border: 'none',
                borderLeft: '4px solid #f47356',
                borderRadius: '0',
            }}>
                <div className="card-body p-4 pe-0">
                    <div>
                        <h5>
                            <Link to={`/profile/${userID}`} className="text-decoration-none text-dark">
                                {name}
                            </Link>
                        </h5>
                        <p className="small">{contentTimestamp}</p>
                        <p>{content}</p>

                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <button
                                    className={`btn p-0 ${likeStatus ? "text-danger" : "text-muted"}`}
                                    onClick={handleLike}
                                    style={{fontSize: "1.5rem", background: "none", border: "none"}}
                                >
                                    <i className={`bi ${likeStatus ? "bi-heart-fill" : "bi-heart"}`}></i>
                                </button>
                                <span className={`ms-2 fs-4 ${likeStatus ? "text-danger" : "text-dark"} fw-bold`}
                                      id="like-count">{likes}</span>
                            </div>
                        </div>
                    </div>

                    {replies && replies.length > 0 && (
                        <button className="btn btn-link" onClick={handleShowReplies}>
                            {showReplies ? "Hide Replies" : "Show Replies"}
                        </button>
                    )}

                    {showReplies && replies && replies.length > 0 && (
                        <div
                            className="mt-3"
                            style={{
                                paddingTop: "10px",
                                marginTop: "15px",
                                position: "relative",
                                overflowY: "auto",
                            }}
                        >
                            {replies.map((reply) => (
                                <CommentCard
                                    key={reply.commentID}
                                    commentID={reply.commentID}
                                    commentLikes={reply.commentLikes}
                                    content={reply.content}
                                    contentTimestamp={reply.contentTimestamp}
                                    reviewID={reply.reviewID}
                                    parentCommentID={reply.parentCommentID}
                                    userID={reply.userID}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentCard;
