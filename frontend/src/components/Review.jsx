import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../contexts/UserContext';
import {useInRouterContext} from "react-router-dom";
import CommentCard from "./CommentCard";
import CommentSection from "./CommentSection";
import PhotoScroller from "./PhotoScroller";

function Review({ReviewID}) {
  const {user} = useContext(UserContext);
  const [reviewID] = useState(ReviewID);
  const [topComment, setTopComment] = useState(null);
  const [error, setError] = useState('');
  const [overallRating, setOvrRating] = useState(-1);
  const [serviceRating, setSrvRating] = useState(-1);
  const [waitTimeRating, setWaitRating] = useState(-1);
  const [dayofWeek, setDayofWeek] = useState('');
  const [timeStamp, setTimeStamp] = useState('');
  const [userID, setUser] = useState('');
  const [userName, setUserName] = useState('');
  const [dishReviews, setDishReviews] = useState([]);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [photos, setPhotos] = useState([]);

  const handleReload = () => {
    setReloadTrigger(!reloadTrigger);
  }

  const getPhotosForReview = async () => {
    try {
      const response = await fetch('/api/photos/get-photos-for-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reviewID: ReviewID}),
      });
      let res = await response.json();
      if (response.ok) {
        setPhotos(res.photos);
      }
    } catch (err) {
      console.log("something went wrong with fetching")
    }
  }

  const getTopComment = async () => {
    try {
      const response = await fetch('/api/comments/getTopComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({reviewID: ReviewID}),
      });
      let res = await response.json();
      if (!response.ok || !res.success) {
        setError(res.error);
      }
      if (res.topComment) {
        setTopComment(res.topComment);
      }
    } catch (e) {
      console.log('something weird happened');
    }
  };

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
    getPhotosForReview()
  }, [reviewID, reloadTrigger]);

  return (
      <div className="col justify-content-center align-items-center">
        {userName !== '' ? <div>
          <div>Day visited: {dayofWeek}</div>
          <div>Time visited: {timeStamp}</div>
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
        <div className="mt-4 w-100 d-flex justify-content-center">
          {photos.length > 0 && <PhotoScroller photos={photos}/>}
        </div>
        {topComment ? <div>
          <CommentSection comments={[topComment]} onReload={handleReload}/>
        </div> : ""}
      </div>
  );
}

export default Review;