const { withOracleDB } = require('../../appService');
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

async function searchRevs(searchKey) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
        'SELECT * FROM Review WHERE ReviewID=:id',
        [searchKey]
    );
    return result.rows;
  }).catch((e) => {
    Promise.reject(e.message);
  });
}

async function searchDishRevs(searchKey) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
        'SELECT * FROM ReviewsDish WHERE ReviewID=:id',
        [searchKey]
    );
    return result.rows;
  }).catch((e) => {
    Promise.reject(e.message);
  });
}

async function getUserReviews(userID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM REVIEW WHERE USERID=:userID', {
            userID: userID
        });
        if (result.rows.length === 0) {
            return {};
        }
        return result.rows.map((row) => {
            return {
                reviewID: row[0],
                overallRating: row[1],
                serviceRating: row[2],
                waitTimeRating: row[3],
                dayVisited: row[4],
                timestamp: row[5],
                locationName: row[6],
                locationAddress: row[7],
                locationPostalCode: row[8],
                locationCountry: row[9]
            };
        });
    });
}

module.exports = {
  insertReview,
  deleteReview,
  searchRevs,
  searchDishRevs,
    getUserReviews
};
