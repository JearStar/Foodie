import React, {useEffect, useState} from 'react';
import './App.css';
import './LoginScreen.css';
import {App} from "./App";

function LoginScreen({onLoginSuccess}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [createNewAcc, setCreateNewAcc] = useState(false);

    const loginAtt = () => {
        return fetch( "/api/login",
            {
                method: 'POST',
                body: JSON.stringify({"user": username, "pass": password}),
                headers: {
                    'content-type':'application/json'
                }
            })
            .then((res) =>res.json())
            .then((data) => {
                const result = data["status"];
                console.log(data["status"]);
                if (result === "Login successful") {
                    onLoginSuccess();
                } else {
                    setErrorMsg(result);
                }
            })
            .catch(err => {
                setError(true);
            })
    }

    return (
        <div className="LoginScreen">
            <div className="LoginHoriz">
                <p>
                    Email:
                </p>
                <textarea className={"Username"}
                          defaultValue={""}
                          onChange={e =>
                              setUsername(e.target.value)}
                />
            </div>
            <div className="LoginHoriz">
                <p>
                    Password:
                </p>
                <textarea className={"Password"}
                          defaultValue={""}
                          onChange={e =>
                              setPassword(e.target.value)}
                />
            </div>
            <div className="LoginHoriz">
                <p>
                    <button onClick={() => setCreateNewAcc(true)}>
                        Create new account
                    </button>
                </p>
                <p>
                    <button onClick={() => {
                        loginAtt();
                    }}>
                        Log in
                    </button>
                </p>
            </div>
            <p>
                {errorMsg}
            </p>
        </div>
    );
}

export default LoginScreen;