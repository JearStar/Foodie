import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const authentication = async (email, password) => {
    try {
      const response = await fetch('/api/users/authenticate-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      let auth = await response.json();

      if (!response.ok) {
        setError(auth.error);
        return false;
      }

      return true;
    } catch (e) {
      console.log('something weird happened');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await authentication(email, password)) {
      handleLogin();
    }
  };

  return (
    <div className="no-scroll">
      <div
        className="container mt-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="col-12 col-md-6 col-lg-4">
          <h2 className="text-center mb-4 text-light">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-center text-light">
                Email
              </label>
              <input
                type="email"
                className="form-control form-control-sm"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-center text-light">
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-sm"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-flex justify-content-center mb-3">
              <button type="submit" className="btn btn-dark">
                Login
              </button>
            </div>
          </form>
          <div className="d-flex justify-content-center">
            <Link to="/signup" className="btn btn-link text-light p-0">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
