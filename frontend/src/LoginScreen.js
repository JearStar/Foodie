import React, { useEffect, useState } from 'react';
import './App.css';
import { App } from './App';

const localHost = 'http://localhost:65535';

function LoginScreen({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setError] = useState(false);

  const loginAtt = () => {
    return fetch(localHost + '/login', {
      method: 'POST',
      body: { Foo: 'Bar' },
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        onLoginSuccess();
      })
      .catch((err) => {
        setError(true);
      });
  };

  return (
    <div className="LoginScreen">
      <p>
        <textarea
          className={'Username'}
          defaultValue={'Email:'}
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          className={'Password'}
          defaultValue={'Password:'}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => {
            loginAtt();
          }}
        >
          Log in
        </button>
      </p>
    </div>
  );
}

export default LoginScreen;
