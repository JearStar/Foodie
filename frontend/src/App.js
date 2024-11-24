import React, { useContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from "./pages/Profile";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from './contexts/UserContext';
import AddFoodLocation from "./pages/AddFoodLocation";
import FoodLocation from "./pages/FoodLocation";

function App() {
  const { user, login} = useContext(UserContext);
  const ADMIN_UUID = '7309d25b-1e98-4a82-ba00-8b412b1c7e2e';
  const handleButtonClick = async () => {
    try {
      const response = await fetch('/api/run-init-script-sql', {
        method: 'POST',
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-dark">
      <Router>
        {user && <Navbar />}
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '100vh' }}
        >
          <div className="container mt-4">
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/login"
                element={
                  user ? (
                    <Navigate to="/home" />
                  ) : (
                    <Login handleLogin={login} className="login-page" />
                  )
                }
              />
              <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
              <Route path="/add-location" element={(user && user.userID === ADMIN_UUID)? <AddFoodLocation /> : <Navigate to="/home"/>}/>
              <Route path="/profile/:userID" element={user? <Profile /> : <Navigate to="/login" />} />
              {/*<Route path="/profile/:userID/:comments" element={user? <UserComments /> : <Navigate to="/login" />} />*/}
              {/*<Route path="/profile/:userID/:reviews" element={user? <UserReviews /> : <Navigate to="/login" />} />*/}
              <Route path="/location/:name/:country/:postalcode/:address" element={user ? <FoodLocation /> : <Navigate to="/login" />} />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<Navigate to={user ? '/home' : '/login'} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
