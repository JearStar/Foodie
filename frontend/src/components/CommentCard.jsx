import React, { useEffect, useState } from "react";

const CommentCard = ({
                         commentID,
                         commentLikes,
                         content,
                         contentTimestamp,
                         reviewID,
                         parentCommentID,
                         userID
                     }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [replies, setReplies] = useState([]);
    const [name, setName] = useState('');

    const handleShowReplies = () => {
        setShowReplies(!showReplies);
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
                setName(result.data.firstName + result.data.lastName);
            } catch (e) {
                console.error("Error retrieving user information:", e);
            }
        };

        fetchUserInformation();
        fetchComments();
    }, [reviewID]);

    return (
        <div className="d-flex flex-start mb-4">
            <div className="card w-100">
                <div className="card-body p-4">
                    <div>
                        <h5>{name}</h5>
                        <p className="small">{contentTimestamp}</p>
                        <p>{content}</p>

                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <a href="#!" className="link-muted me-2">
                                    <i className="fas fa-thumbs-up me-1"></i>{commentLikes}
                                </a>
                            </div>
                            <a href="#!" className="link-muted">
                                <i className="fas fa-reply me-1"></i> Reply
                            </a>
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
                                paddingTop: "10px", // add some space before the replies
                                marginTop: "15px", // avoid overlap with other content
                                position: "relative", // keep replies within the section
                                overflowY: "auto", // allow scrolling for large sets of replies
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
