import { withOracleDB } from '../../appService';
const Service = require('../../appService');

//INSERT Review
async function insertReview(
  ReviewID,
  OverallRating,
  ServiceRating,
  WaitTimeRating,
  DayOfWeekVisited,
  ReviewTimestamp,
  FoodLocationName,
  Address,
  PostalCode,
  Country,
  UserID
) {
  return await Service.withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO Review (ReviewID, OverallRating, ServiceRating, WaitTimeRating, DayOfWeekVisited, ReviewTimestamp, FoodLocationName, Address, PostalCode, Country, UserID) VALUES (:ReviewID, :OverallRating, :ServiceRating, :WaitTimeRating, :DayOfWeekVisited, :ReviewTimestamp, :FoodLocationName, :Address, :PostalCode, :Country, :UserID)`,
      {
        ReviewID,
        OverallRating,
        ServiceRating,
        WaitTimeRating,
        DayOfWeekVisited,
        ReviewTimestamp,
        FoodLocationName,
        Address,
        PostalCode,
        Country,
        UserID,
      },
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    console.error('Error inserting Review:', error);
    return false;
  });
}

//DELETE DISH
async function deleteReview(
  removeReviewID,
  removeOverallRating,
  removeServiceRating,
  removeWaitTimeRating,
  removeDayOfWeekVisited,
  removeReviewTimestamp,
  removeFoodLocationName,
  removeAddress,
  removePostalCode,
  removeCountry,
  removeUserID
) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `DELETE FROM Review 
                 WHERE ReviewID = :removeReviewID
                 AND OverallRating = :removeOverallRating
                 AND ServiceRating = :removeServiceRating
                 AND WaitTimeRating = :removeWaitTimeRating
                 AND DayOfWeekVisited = :removeDayOfWeekVisited
                 AND ReviewTimestamp = :removeReviewTimestamp
                 AND FoodLocationName = :removeFoodLocationName
                 AND Address = :removeAddress 
                 AND PostalCode = :removePostalCode 
                 AND Country = :removeCountry
                 AND UserID = :removeUserID`,
      {
        removeReviewID,
        removeOverallRating,
        removeServiceRating,
        removeWaitTimeRating,
        removeDayOfWeekVisited,
        removeReviewTimestamp,
        removeFoodLocationName,
        removeAddress,
        removePostalCode,
        removeCountry,
        removeUserID,
      },
      { autoCommit: true }
    );
    return result.rowsAffected && result.rowsAffected > 0;
  });
}
module.exports = {
  insertReview,
  deleteReview,
};
