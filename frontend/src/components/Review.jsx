import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../contexts/UserContext';
import {useInRouterContext} from "react-router-dom";

function Review({ReviewID}) {
  const {user} = useContext(UserContext);
  const [reviewID] = useState(ReviewID);
  const [error, setError] = useState('');
  const [overallRating, setOvrRating] = useState(-1);
  const [serviceRating, setSrvRating] = useState(-1);
  const [waitTimeRating, setWaitRating] = useState(-1);
  const [dayofWeek, setDayofWeek] = useState('');
  const [timeStamp, setTimeStamp] = useState('');
  const [userID, setUser] = useState('');
  const [userName, setUserName] = useState('');
  const [dishReviews, setDishReviews] = useState([]);

  // One call to get review info (excluding food location info)
  const getReviewInfo = async () => {
    try {
      const response = await fetch('/api/review/getReviewInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: ReviewID}),
      });
      let res = await response.json();
      if (!response.ok) {
        setError(res.error);
        return null;
      }
      const reviewInfo = res["reviewInfo"][0];
      setOvrRating(reviewInfo[1]);
      setSrvRating(reviewInfo[2]);
      setWaitRating(reviewInfo[3]);
      setDayofWeek(reviewInfo[4]);
      setTimeStamp(reviewInfo[5]);
      setUser(reviewInfo[10]);

      getUserInfo(reviewInfo[10]);

      return null;
    } catch (e) {
      console.log('something weird happened');
      return null;
    }
  };

  // Another call to get all dish reviews corresponding to reviewID
  const getDishReviews = async () => {
    try {
      const response = await fetch('/api/review/getDishReviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: ReviewID}),
      });
      let res = await response.json();
      if (!response.ok) {
        setError(res.error);
        return null;
      }
      const dishReviewInfo = res["dishReviews"];
      if (typeof dishReviewInfo === "object") {
        setDishReviews(dishReviewInfo);
      }

      return null;
    } catch (e) {
      console.log('something weird happened');
      return null;
    }
  };

  const getUserInfo = async (userID) => {
    try {
      const response = await fetch('/api/users/get-user-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userID: userID}),
      });
      let res = await response.json();
      const data = res.data;
      if (!response.ok) {
        setError(res.error);
        return null;
      }

      setUserName(data.firstName + " " + data.lastName);
    } catch (e) {
      console.log('something weird happened');
      return null;
    }
  }

  // One more recursive request for comments

  useEffect(() => {
    getReviewInfo();
    getDishReviews();
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
      <div className="col justify-content-center align-items-center">
        {userName !== '' ? <div>
          <p>
            <strong>Overall:</strong> {overallRating}/5
          </p>
          <p>
            <strong>Service:</strong> {serviceRating}/5
          </p>
          <p>
            <strong>Wait time:</strong> {waitTimeRating}/5
          </p>
          <p>
            <strong>Day of week visited:</strong> {dayofWeek}
          </p>
          <p>
            <strong>Posted by:</strong> {userName} <strong>at</strong> {timeStamp}
          </p>
        </div> : ""}
      </div>
  );
}

export default Review;