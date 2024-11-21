import React, { useContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from './contexts/UserContext';

function App() {
  const { user, login, logout } = useContext(UserContext);

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
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<Navigate to={user ? '/home' : '/login'} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );

  // if (!loggedIn) {
  //   return (
  //       <div className="App">
  //           <header className="App-header">
  //               <p>
  //                   <LoginScreen onLoginSuccess={() => setLoggedIn(true)}/>
  //               </p>
  //               <p>
  //                   <CustomButton onClick={handleButtonClick}>Initiate DB</CustomButton>
  //               </p>
  //           </header>
  //       </div>
  //   );
  // }
}

export default App;
