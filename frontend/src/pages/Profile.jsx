import React, { useContext, useEffect, useState } from "react";
import "../index.css";
import { UserContext } from "../contexts/UserContext";
import { Link, Outlet, useParams } from "react-router-dom";

const Profile = () => {
    const [userInformation, setUserInformation] = useState({});
    const { userID } = useParams();
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchUserInformation = async () => {
            try {
                const response = await fetch("/api/users/get-user-info", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userID }),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();
                setUserInformation(result.data);
            } catch (e) {
                console.error("Error retrieving user information:", e);
            }
        };
        fetchUserInformation();
    }, [userID]);

    return (
        <div>
            <div
                className="position-absolute p-3"
                style={{
                    top: "60px",
                    left: 0,
                    width: "100%",
                    zIndex: 1000,
                    borderBottom: "1px solid #ddd",
                }}
            >
                <h1 className="mainheader">{userInformation.firstName}'s Profile</h1>
                <h2>Number of reviews: {userInformation.numReviews}</h2>
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="./reviews">
                            Reviews
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="./comments">
                            Comments
                        </Link>
                    </li>
                    {user.userID === userID && (
                        <li className="nav-item">
                            <Link className="nav-link" to="./edit-details">
                                Edit Details
                            </Link>
                        </li>
                    )}
                </ul>
            </div>

            {/* Main Content */}
            <div
                style={{
                    marginTop: "200px",
                    padding: "20px",
                }}
            >
                <Outlet />
            </div>
        </div>
    );
};

export default Profile;