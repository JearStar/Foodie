import React, {useEffect, useState} from "react";
import CustomButton from "./Button";
import Button from "./Button";

const user = "cb99dc29-cd12-4840-8bdc-a5c495b9af9d";

const Profile = () => {
    const [updateEmail, setUpdateEmail] = useState(false);
    const [updateEmailText, setUpdateEmailText] = useState("Update Email");
    const [newEmail, setNewEmail] = useState('')
    const [userInformation, setUserInformation] = useState({});

    // Fetch user information on component mount
    useEffect(() => {
        fetchUserInformation();
    }, []);

    const fetchUserInformation = async () => {
        try {
            const response = await fetch('/api/users/get-user-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: "cb99dc29-cd12-4840-8bdc-a5c495b9af9d"
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Information retrieved successfully:', result);
            setUserInformation(result.data[0]); // Set user info in state
        } catch (e) {
            console.error('Error retrieving user information:', e);
        }
    };

    const handleSubmitEmail = (e) => {
        e.preventDefault()
        if(!newEmail) {
            alert("Please add an email")
            return
        }

        if (validateEmail(newEmail)) {
            setNewEmail("")
            setUpdateEmail(false)
            setUpdateEmailText("Update Email")
            alert("Email updated to " + newEmail)
        }
    }

    function updateEmailClick () {
        setUpdateEmail(!updateEmail)
        if (!updateEmail) {
            setUpdateEmailText("Close")
        } else {
            setUpdateEmailText("Update Email")
        }
    }

    const [updatePassword, setUpdatePassword] = useState(false);
    const [updatePasswordText, setUpdatePasswordText] = useState("Update Password");
    const [newPassword, setNewPassword] = useState('')

    const handleSubmitPassword = (e) => {
        e.preventDefault()
        if(!newPassword) {
            alert("Please add an password")
            return
        }
        setNewPassword("")
        setUpdatePassword(false)
        setUpdatePasswordText("Update Password")
        alert("ok password " + newPassword)
    }
    function updatePasswordClick () {
        setUpdatePassword(!updatePassword)
        if (!updatePassword) {
            setUpdatePasswordText("Close")
        } else {
            setUpdatePasswordText("Update Password")
        }
    }

    function validateEmail(email) {
        const regex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/

        const isValid = regex.test(email);
        if (!isValid) {
            alert('Invalid Email Address ' + email);
        }
        return isValid;
    }

    return (
        <div>
            <h1> Profile </h1>
            <h2>Email</h2>
            <div>
                <div>{userInformation.email}</div>

                {updateEmail ?
                    <form onSubmit={handleSubmitEmail}>
                        <input type='text' placeholder='New email' value={newEmail}
                               onChange={(e) => setNewEmail(e.target.value)}/>
                        <input type='submit' value='Update'/>
                    </form>
                    : ""}
            </div>
            <Button onClick={updateEmailClick}> {updateEmailText}</Button>

            <h2>Password</h2>
            <div>
                {updatePassword ?
                    <form onSubmit={handleSubmitPassword}>
                        <input type='text' placeholder='New password' value={newPassword}
                               onChange={(e) => setNewPassword(e.target.value)}/>
                        <input type='submit' value='Update'/>
                    </form>
                    : ""}
            </div>
            <Button onClick={updatePasswordClick}> {updatePasswordText}</Button>

        </div>
    );
};

export default Profile;