import React, {useContext, useEffect, useState} from "react";
import '../index.css';
import {UserContext} from "../contexts/UserContext";


// const user = "4d7577fc-636e-40b1-ab1f-f3c12422c84a";

const Profile = () => {
    const { user } = useContext(UserContext);

    const [userInformation, setUserInformation] = useState({});

    //Email
    const [updateEmail, setUpdateEmail] = useState(false);
    const [updateEmailText, setUpdateEmailText] = useState("Update Email");
    const [newEmail, setNewEmail] = useState('')

    //Password
    const [updatePassword, setUpdatePassword] = useState(false);
    const [updatePasswordText, setUpdatePasswordText] = useState("Update Password");
    const [newPassword, setNewPassword] = useState('')
    const [retypeNewPassword, setRetypeNewPassword] = useState('')
    const [checkOldPassword, setCheckOldPassword] = useState('')

    // Fetch user information on component mount
    useEffect(() => {
        // fetchUserInformation();
        setUserInformation(user)
    }, []);

    // const fetchUserInformation = async () => {
    //     try {
    //         const response = await fetch('/api/users/get-user-info', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 userID: user.userID
    //             }),
    //         });
    //
    //         if (!response.ok) {
    //             throw new Error(`Error: ${response.status} ${response.statusText}`);
    //         }
    //
    //         const result = await response.json();
    //         console.log('Information retrieved successfully:', result);
    //         setUserInformation(result.data[0]); // Set user info in state
    //     } catch (e) {
    //         console.error('Error retrieving user information:', e);
    //     }
    // };

    const changeEmail = async () => {
        try {
            const response = await fetch('/api/users/change-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldEmail: userInformation.email,
                    newEmail: newEmail
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

    const changePassword = async () => {
        try {
            const response = await fetch('/api/users/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userInformation.email,
                    password: newPassword
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

        if(newEmail == userInformation.email) {
            alert("New email must not be the same as old email")
            return
        }

        if (validateEmail(newEmail)) {
            setNewEmail("")
            setUpdateEmail(false)
            setUpdateEmailText("Update Email")
            changeEmail()
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

    const handleSubmitPassword = (e) => {
        e.preventDefault()
        if(!newPassword) {
            alert("Please add a password")
            return
        }

        if (checkOldPassword !== userInformation.password) {
            alert("Old password incorrect")
            return
        }

        if (newPassword !== retypeNewPassword) {
            alert("New password does not match")
            return
        }

        if (newPassword === userInformation.password) {
            alert("Cannot make new password the same as current password")
            return
        }
        changePassword()
        setCheckOldPassword("")
        setNewPassword("")
        setRetypeNewPassword("")
        setUpdatePassword(false)
        setUpdatePasswordText("Update Password")
        alert("Password changed to " + newPassword)
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
        <div className="app">
            <h1 className= "mainheader"> My Profile </h1>
            <h2>Welcome {userInformation.firstName}</h2>
            <h3>Edit Account Details</h3>
            <h4>Email</h4>
            <div>
                {updateEmail ? (
                    <form onSubmit={handleSubmitEmail} className="p-3">
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control w-50"
                                placeholder="New email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-danger">
                            Update
                        </button>
                    </form>
                ) : (
                    ""
                )}
            </div>

            {
                updateEmail ?
                    <button type="button" className="btn-close" aria-label="Close" onClick={updateEmailClick}/> :
                    <button type="button" class="btn btn-danger " style={{ width: '15vw' }}onClick={updateEmailClick}> Update email</button>
            }


            <h4>Password</h4>
            <div>
                {updatePassword ? (
                    <form onSubmit={handleSubmitPassword} className="p-3">
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control w-50"
                                placeholder="Old password"
                                value={checkOldPassword}
                                onChange={(e) => setCheckOldPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control w-50"
                                placeholder="New password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control w-50"
                                placeholder="Retype new password"
                                value={retypeNewPassword}
                                onChange={(e) => setRetypeNewPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-danger">
                            Update
                        </button>
                    </form>
                ) : (
                    ""
                )}
            </div>

            {
                updatePassword ?
                    <button type="button" className="btn-close" aria-label="Close" onClick={updatePasswordClick}/> :
                    <button type="button" class="btn btn-danger" style={{ width: '15vw' }} onClick={updatePasswordClick}> Update password</button>
            }

        </div>
    );
};

export default Profile;