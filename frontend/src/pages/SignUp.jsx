import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleSignUp = async (email, password, name) => {
    try {
      const response = await fetch('/api/users/create-user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });
      let signupResponse = await response.json();

      if (!response.ok) {
        setError(signupResponse.error);
        return false;
      }

      return true;
    } catch (e) {
      console.log('Something weird happened');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (await handleSignUp(email, password, name)) {
      navigate('/login');
    }
  };

  return (
    <div className="no-scroll">
      <div
        className="container mt-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="col-12 col-md-6 col-lg-4">
          <h2 className="text-center mb-4 text-light">Sign Up</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-center text-light">
                Full Name
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label text-center text-light">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control form-control-sm"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-flex justify-content-center mb-3">
              <button type="submit" className="btn btn-dark w-50">
                Sign Up
              </button>
            </div>
          </form>
          <div className="d-flex justify-content-center">
            <Link to="/login" className="btn btn-link text-light p-0">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
