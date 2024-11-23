import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../contexts/UserContext';
import {Link} from "react-router-dom";

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
  const sendSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/foodlocation/findLocs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search: search.toLowerCase()}),
      });
      let res = await response.json();

      if (!response.ok) {
        setError(res.error);
        return null;
      }
      const foodLocations = res["FoodLocations"];
      if (typeof foodLocations === "object") {
        setSearchLocs(foodLocations);   // placeholder
      }

      const foodLocationSummaries = res["FoodLocationSummaries"];
      if (typeof foodLocationSummaries === "object") {
        setSearchSummaries(foodLocationSummaries);   // placeholder
      }

      if (foodLocations.length === 0) {
        setMessage("No results found.");
      } else {
        setMessage(`${foodLocations.length} result${foodLocations.length === 1 ? '' : 's'} found`);
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
              {/*<label className="form-label text-center text-light">*/}
              {/*  /!*{result}*!/*/}
              {/*  {result[0]}*/}
              {/*</label>*/}
              <Link  to={`/location/${result[0]}/${result[3]}/${result[2]}/${result[1]}`} >
                View {result[0]}, {result[1]}, {result[6]}, {result[3]}
              </Link>
            </div>
        );
      }
    }
    return dispArray;
  }

  return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <h1 className="text-light text-center mt-3">
            Hi {user.firstName} {user.lastName}! What can I do for you today?
          </h1>
          <div className='container mt-4 d-flex justify-content-center'>
            <form className='d-flex' style={{width: '40%'}} role='search' onSubmit={sendSearch}>
              <input
                  className='form-control'
                  type='search'
                  placeholder='Search here...'
                  aria-label='Search'
                  title='Enter a search term'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
              />
              <button className='btn btn-dark custom-button' type='submit' disabled={search.trim() === ''}>
                Search
              </button>
            </form>
          </div>
          <label className="form-label text-center text-light">
            {message}
          </label>
          {displayResults()}

        </div>
  );
}

export default Home;
