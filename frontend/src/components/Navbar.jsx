import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const ADMIN_UUID = '7309d25b-1e98-4a82-ba00-8b412b1c7e2e';
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
          <Link className="navbar-brand text-light" to="/">
              <img src={require('../foodie.png')} alt="Foodie" style={{height: '7vw'}}/>
          </Link>
          <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                  {user.userID === ADMIN_UUID && <li className="nav-item">
                      <Link className="button" to="/add-location">
                          Add Location
                      </Link>
                  </li>}
                  <li className="nav-item">
                      <Link className="button" to="/home">
                          Home
                      </Link>
                  </li>
                  <li className="nav-item">
                      <Link className="button" to={`/profile/${user.userID}`}>
                          Profile
                      </Link>
                  </li>
                  <li className="nav-item">
                      <Link className="button" to="/mcdonalds-hall-of-fame">
                          McDonald's Leaderboard
                      </Link>
                  </li>
                  <li className="nav-item">
                      <button className="button" onClick={logout}>
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
