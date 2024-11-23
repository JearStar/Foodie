import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const ADMIN_UUID = '7309d25b-1e98-4a82-ba00-8b412b1c7e2e';
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          Foodie
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {user ? (
                <>
                  <li className="nav-item">
                    <Link className="btn btn-dark" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-dark" to="/home">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-dark" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </>
            ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
            <ul className="navbar-nav ms-auto">
                {user.userID === ADMIN_UUID && <li className="nav-item">
                    <Link className="btn btn-dark" to="/add-location">
                        Add Location
                    </Link>
                </li>}
                <li className="nav-item">
                    <Link className="btn btn-dark" to="/home">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <button className="btn btn-dark" onClick={logout}>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
