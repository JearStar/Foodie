import React, { useEffect, useState } from 'react';
import './App.css';
import CustomButton from './Button';
import LoginScreen from './LoginScreen';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleButtonClick = async () => {
    try {
      const response = await fetch('/api/run-init-script-sql', {
        method: 'POST',
      });
    } catch (e) {
      console.log(e);
    }
  };

  if (!loggedIn) {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    <LoginScreen onLoginSuccess={() => setLoggedIn(true)}/>
                </p>
                <p>
                    <CustomButton onClick={handleButtonClick}>Initiate DB</CustomButton>
                </p>
            </header>
        </div>
  );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <CustomButton onClick={handleButtonClick}>Initiate DB</CustomButton>
        </header>
      </div>
    );
  }
}

export default App;
