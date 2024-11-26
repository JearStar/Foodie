import React, {useContext, useEffect, useState} from "react";
import '../index.css';
import {Link, useParams} from "react-router-dom";
import Review from "./Review";


const ProfileRatings = () => {
    const [avgRatings, setAvgRatings] = useState({});
    const [showRatings, setShowRatings] = useState(false);

    const { userID } = useParams();



    async function fetchUserRatings() {
        try {
            const response = await fetch('/api/review/get-user-avg-ratings', {
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
            setAvgRatings(result.data[0]);
            return result.data;
        } catch (e) {
            console.error('Error retrieving user information:', e);
        }
    }

    const toggleRatingsVisibility = () => {
            fetchUserRatings();

        setShowRatings(!showRatings);
    };

    return (
        <div>


            <button className="button" onClick={toggleRatingsVisibility}>
                {showRatings ? "Close" : "Show User's Average Ratings"}
            </button>

            {showRatings && avgRatings && (
                <div>
                    <h2>User Ratings</h2>
                    <p><strong>Average Overall Rating:</strong> {avgRatings.averageOverallRating}</p>
                    <p><strong>Average Service Rating:</strong> {avgRatings.averageServiceRating}</p>
                    <p><strong>Average Wait Time Rating:</strong> {avgRatings.averageWaitTimeRating}</p>
                </div>
            )}

            {showRatings && !avgRatings && (
                <p>No ratings available. Press the button to fetch ratings.</p>
            )}
        </div>
    );
};

export default ProfileRatings;