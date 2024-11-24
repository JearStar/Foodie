import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import CommentSection from "./CommentSection";


function ProfileComments() {
    const { userID } = useParams();
    const [comments, setComments] = useState([]);
    useEffect( () => {
        const fetchComments = async () => {
            console.log(userID);
            try {
                const response = await fetch(`/api/comments/get-user-comments`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({userID: userID}),
                });
                const data = await response.json();
                if (!response.ok || !data.success) {
                    console.log('Failed to fetch comments from user');
                }
                setComments(data.data);
            } catch (err) {
                console.error('Error fetching comments:', err);
            }
        };
        fetchComments();
    }, [userID]);
    return (
        <CommentSection comments={comments}/>
    );
}
export default ProfileComments;