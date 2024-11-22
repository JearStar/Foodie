import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../contexts/UserContext';

function Home() {
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState('');
  const [searchLocs, setSearchLocs] = useState([]);
  const [searchSummaries, setSearchSummaries] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // FYI, this returns the full FoodLocation and FoodLocationSummary for each search result.
  const sendSearch = async (enteredValue) => {
    try {
      const response = await fetch('/api/foodlocation/findLocs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search: enteredValue}),
      });
      let res = await response.json();

      if (!response.ok) {
        setError(res.error);
        return null;
      }
      const foodLocations = res["FoodLocations"];
      console.log(foodLocations);
      if (typeof foodLocations === "object") {
        setSearchLocs(foodLocations);   // placeholder
      }

      const foodLocationSummaries = res["FoodLocationSummaries"];
      console.log(foodLocationSummaries);
      if (typeof foodLocationSummaries === "object") {
        setSearchSummaries(foodLocationSummaries);   // placeholder
      }

      if (foodLocations.length === 0) {
        setMessage("No results found.");
      } else {
        setMessage(foodLocations.length + " results found.");
      }

      return null;
    } catch (e) {
      console.log('something weird happened');
      return null;
    }
  };

  // To display a dynamic number of results, I figure something like this would work nice.
  const displayResults = () => {
    let dispArray = [];
    if (searchLocs === []) {
      return dispArray;
    } else {
      for (const result of searchLocs) {
        dispArray.push(
            <div className="row mb-3">
              <label className="form-label text-center text-light">
                {result}
              </label>
            </div>
        );
      }
    }
    return dispArray;
  }

  return (
      <div className="col justify-content-center align-items-center">
        <h1 className="text-light">
          Hi {user.firstName} {user.lastName}! What can I do for you today?
        </h1>
        <div className="row mb-3">
          <label htmlFor="Find by name" className="form-label text-center text-light">
            Find by name (use lowercase)
          </label>
          <input
              type="search"
              className="form-control form-control-sm"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-dark" disabled={search.trim() === ''} onClick={() => {
            sendSearch(search);
          }}>
            Search
          </button>
        </div>
        <label className="form-label text-center text-light">
          {message}
        </label>
        {displayResults()}
      </div>
  );
}

export default Home;
