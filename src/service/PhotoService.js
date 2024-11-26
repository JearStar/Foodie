const { withOracleDB } = require('../../appService');

const Service = require('../../appService');

//INSERT Photo
async function insertPhoto(photo) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO Photo (PHOTOID, IMAGEURL, PHOTOLIKES, DESCRIPTION, PHOTOTIMESTAMP, REVIEWID, SUMMARYID) VALUES (:photoID, :image, :photoLikes, :description, SYSDATE, :reviewID, :summaryID)`,
      {
        photoID: photo.photoID,
        image: photo.imageURL,
        photoLikes: photo.photoLikes,
        description: photo.description,
        reviewID: photo.reviewID,
        summaryID: photo.summaryID,
      },
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  })
}

async function getPhotosFromUserOfFoodType(userID, type){
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT DISTINCT p.PHOTOID, p.IMAGEURL, p.PHOTOLIKES, p.DESCRIPTION, p.PHOTOTIMESTAMP, p.REVIEWID, p.SUMMARYID, 
                r.FOODLOCATIONNAME, r.ADDRESS, r.POSTALCODE, r.COUNTRY, f.CITY
             FROM DISH d, REVIEWSDISH rd, REVIEW r, PHOTO p, FOODLOCATION f
             WHERE d.DISHNAME = rd.DISHNAME AND
                 d.FOODLOCATIONNAME = rd.FOODLOCATIONNAME AND
                 d.ADDRESS = rd.ADDRESS AND
                 d.POSTALCODE = rd.POSTALCODE AND
                 d.COUNTRY = rd.COUNTRY AND
                 rd.REVIEWID = r.REVIEWID AND
                 r.REVIEWID = p.REVIEWID AND
                 f.FOODLOCATIONNAME = d.FOODLOCATIONNAME AND
                 f.ADDRESS = d.ADDRESS AND
                 f.POSTALCODE = d.POSTALCODE AND
                 f.COUNTRY = d.COUNTRY AND
                 r.USERID = :userID AND
                 d.TYPE = :type
            `,
            {
                userID: userID,
                type: type
            },
            { autoCommit: true }
        );

        return result.rows.map((row) => {
            return {
                photoID: row[0],
                imageURL: row[1],
                photoLikes: row[2],
                description: row[3],
                photoTimestamp: row[4],
                reviewID: row[5],
                summaryID: row[6],
                foodLocationName: row[7],
                address: row[8],
                postalCode: row[9],
                country: row[10],
                city: row[11]
            };
        });
    })
}

async function getPhotosForReview(reviewID){
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT DISTINCT p.PHOTOID, p.IMAGEURL, p.PHOTOLIKES, p.DESCRIPTION, p.PHOTOTIMESTAMP, p.REVIEWID, p.SUMMARYID, 
                r.FOODLOCATIONNAME, r.ADDRESS, r.POSTALCODE, r.COUNTRY, f.CITY
             FROM DISH d, REVIEWSDISH rd, REVIEW r, PHOTO p, FOODLOCATION f
             WHERE d.DISHNAME = rd.DISHNAME AND
                 d.FOODLOCATIONNAME = rd.FOODLOCATIONNAME AND
                 d.ADDRESS = rd.ADDRESS AND
                 d.POSTALCODE = rd.POSTALCODE AND
                 d.COUNTRY = rd.COUNTRY AND
                 rd.REVIEWID = r.REVIEWID AND
                 r.REVIEWID = p.REVIEWID AND
                 f.FOODLOCATIONNAME = d.FOODLOCATIONNAME AND
                 f.ADDRESS = d.ADDRESS AND
                 f.POSTALCODE = d.POSTALCODE AND
                 f.COUNTRY = d.COUNTRY AND
                 r.REVIEWID = :reviewID
            `,
            {
                reviewID: reviewID
            },
            { autoCommit: true }
        );

        return result.rows.map((row) => {
            return {
                photoID: row[0],
                imageURL: row[1],
                photoLikes: row[2],
                description: row[3],
                photoTimestamp: row[4],
                reviewID: row[5],
                summaryID: row[6],
                foodLocationName: row[7],
                address: row[8],
                postalCode: row[9],
                country: row[10],
                city: row[11]
            };
        });
    })
}

//DELETE Photo
async function deletePhoto(
  removePhotoID,
  removeImage,
  removePhotoLikes,
  removeDescription,
  removeTimestamp,
  removeReviewID,
  removeSummaryID
) {
  return await withOracleDB(async (connection) => {
    try {
      const result = await connection.execute(
        `DELETE FROM Photo 
                 WHERE PhotoID = :removePhotoID
                 AND Image = :removeImage
                 AND PhotoLikes = :removePhotoLikes
                 AND Description = :removeDescription
                 AND PhotoTimestamp = :removeTimestamp
                 AND ReviewID = :removeReviewID
                 AND SummaryID = :removeSummaryID`,
        {
          removePhotoID: removePhotoID,
          removeImage: removeImage,
          removePhotoLikes: removePhotoLikes,
          removeDescription: removeDescription,
          removeTimestamp: removeTimestamp,
          removeReviewID: removeReviewID,
          removeSummaryID: removeSummaryID,
        },
        { autoCommit: true }
      );

      return result.rowsAffected && result.rowsAffected > 0;
    } catch (error) {
      console.error('Error deleting Photo:', error);
      return false;
    }
  });
}
module.exports = {
    insertPhoto,
    deletePhoto,
    getPhotosFromUserOfFoodType,
    getPhotosForReview
};
