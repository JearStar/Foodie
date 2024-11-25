import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../contexts/UserContext';
import {useInRouterContext} from "react-router-dom";
import CommentCard from "./CommentCard";

function Review({ReviewID}) {
  const {user} = useContext(UserContext);
  const [reviewID] = useState(ReviewID);
  const [topCommentInfo, setTopComentInfo] = useState([]);
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

  const getTopComment = async () => {
    try {
      const response = await fetch('/api/comments/getTopComment', {
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
      const commentInfo = res["commentInfo"];
      if (commentInfo.length === 0) {
        return null;
      }
      setTopComentInfo(commentInfo[0]);
      console.log(commentInfo[0]);

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
      console.log(dishReviewInfo);
      if (typeof dishReviewInfo === "object" && dishReviewInfo.length > 0) {
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
    getTopComment();
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
      <div className="col justify-content-center align-items-center">
        {userName !== '' ? <div>
          <div>Day visited: {dayofWeek}, {timeStamp}</div>
          <div>Overall rating: {overallRating}</div>
          <div>Service rating: {serviceRating}</div>
          <div>Wait time rating: {waitTimeRating}</div>
          <div><strong>Dish ratings: </strong></div>
          {dishReviews.length > 0 ? (
              dishReviews.map((dishReview) => (
                  <div>{dishReview[1]}: {dishReview[2]}</div>
              ))
          ) : ""}
          <div>Posted by: {userName}</div>
        </div> : ""}
        {topCommentInfo.length !== 0 ? <div>
          <CommentCard
              key={topCommentInfo[0]}
              commentID={topCommentInfo[0]}
              commentLikes={topCommentInfo[1]}
              content={topCommentInfo[2]}
              contentTimestamp={topCommentInfo[3]}
              reviewID={topCommentInfo[4]}
              parentCommentID={topCommentInfo[5]}
              userID={topCommentInfo[6]}
              onReload={}
          />
        </div> : ""}
      </div>
  );
}

export default Review;