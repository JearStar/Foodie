import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../contexts/UserContext';
import {useInRouterContext} from "react-router-dom";

function Review({ReviewID}) {
  const {user} = useContext(UserContext);
  const [reviewID] = useState(ReviewID);
  const [error, setError] = useState('');
  const [overallRating, setOvrRating] = useState(null);
  const [serviceRating, setSrvRating] = useState(null);
  const [waitTimeRating, setWaitRating] = useState(null);
  const [DayofWeek, setDayofWeek] = useState(null);
  const [timeStamp, setTimeStamp] = useState(null);
  const [userID, setUser] = useState(null);
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
      const reviewInfo = res["reviewInfo"];
      if (typeof reviewInfo === "object") {
        setOvrRating(reviewInfo[1]);
        setSrvRating(reviewInfo[2]);
        setWaitRating(reviewInfo[3]);
        setDayofWeek(reviewInfo[4]);
        setTimeStamp(reviewInfo[5].split('.')[0]);
        setUser(reviewInfo[10]);
      }

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
        <p>
          E
        </p>
      </div>
  );
}