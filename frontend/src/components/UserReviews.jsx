import React, {useContext, useEffect, useState} from "react";
import '../index.css';
import {Link, useParams} from "react-router-dom";

const UserReviews = () => {
    const { userID } = useParams();
    const [userReviews, setUserReviews] = useState([]);
    const [userComments, setUserComments] = useState([]);

    useEffect(() => {
        fetchUserReviews();
        fetchUserComments()
    }, []);

    async function fetchUserReviews() {
        try {
            const response = await fetch('/api/review/get-user-reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: userID
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Information retrieved successfully:', result);
            setUserReviews(result.data);
            return result.data;
        } catch (e) {
            console.error('Error retrieving user information:', e);
        }
    };

    async function fetchUserComments() {
        try {
            const response = await fetch('/api/comment/get-users-comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: userID
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Information retrieved successfully:', result);
            setUserComments(result.data);
            return result.data;
        } catch (e) {
            console.error('Error retrieving user information:', e);
        }
    };

    const displayUserReviews = () => {
        let result = [];
        if (userReviews === []) {
            result.push(<p>No reviews yet.</p>)
            return result;
        } else {
            for (const review of userReviews) {
                let reviewComment = "";
                const reviewReviewID = review.reviewID;
                for (const comment of userComments) {
                    if (comment.reviewID === reviewReviewID) {
                        reviewComment = comment.commentContent
                        break;
                    }
                }
                result.push(
                    <div>
                        <h2>{review.locationName}</h2>
                        <div>{review.locationAddress}, {review.locationPostalCode}, {review.locationCountry}</div>
                        <div>Day visited: {review.dayVisited}, {review.timestamp}</div>
                        <div>Overall rating: {review.overallRating}</div>
                        <div>Service rating: {review.serviceRating}</div>
                        <div>Wait time rating: {review.waitTimeRating}</div>
                        <div>{reviewComment}</div>
                    </div>
                );
            }
        }
        return result;
    }

    return (
        <div className="app">
            <h1 className="mainheader"> Reviews </h1>
            {displayUserReviews()}
        </div>
    );
};

export default UserReviews;