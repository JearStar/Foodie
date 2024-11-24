import React from "react";
import CommentCard from "./CommentCard";

const CommentSection = ({comments}) => {
    const safeComments = Array.isArray(comments) ? comments : [];
    if (!comments) {
        return <div>Loading comments...</div>;
    }
    if (comments.length === 0) {
        return <div>No comments...</div>
    }
    return (
        <section>
            <div className="container my-5 py-5 text-body">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-11 col-lg-9 col-xl-7">
                        {safeComments.map((comment) => (
                            <CommentCard
                                commentID={comment.commentID}
                                commentLikes={comment.commentLikes}
                                content={comment.content}
                                contentTimestamp={comment.contentTimestamp}
                                reviewID={comment.reviewID}
                                parentCommentID={comment.parentCommentID}
                                userID={comment.userID}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default CommentSection;
