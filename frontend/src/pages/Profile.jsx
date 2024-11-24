import React, {useContext, useEffect, useState} from "react";
import '../index.css';
import {UserContext} from "../contexts/UserContext";
import {useParams} from "react-router-dom";
import EditAccountDetails from "../components/EditAccountDetails";
import UserReviews from "../components/UserReviews";


const Profile = () => {
    const [userInformation, setUserInformation] = useState({});
    const { userID } = useParams();

    // Fetch user information on component mount
    useEffect(() => {
        const fetchUserInformation = async () => {
            try {
                const response = await fetch('/api/users/get-user-info', {
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
                setUserInformation(result.data);
            } catch (e) {
                console.error('Error retrieving user information:', e);
            }
        };
        fetchUserInformation();
    }, []);


    return (
        <div className="app">
            <h1 className= "mainheader"> My Profile </h1>
            <h2>Welcome {userInformation.firstName}</h2>
            <EditAccountDetails />
            <UserReviews />

        </div>
    );
};

export default Profile;