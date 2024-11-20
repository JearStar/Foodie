import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function Home() {
  const { user } = useContext(UserContext);
  return (
    <div className="d-flex justify-content-center align-items-center">
      <h1 className="text-light">Hi! What can I do for you today?</h1>
    </div>
  );
}

export default Home;
