const { withOracleDB } = require('../../appService');

const Service = require('../../appService');

//INSERT Photo
async function insertPhoto(
  PhotoID,
  Image,
  PhotoLikes,
  Description,
  PhotoTimestamp,
  ReviewID,
  SummaryID
) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO Photo (PHOTOID, IMAGE, PHOTOLIKES, DESCRIPTION, PHOTOTIMESTAMP, REVIEWID, SUMMARYID) VALUES (:photoID, :image, :photoLikes, :description, :photoTimestamp, :reviewID, :summaryID)`,
      {
        photoID: PhotoID,
        image: Image,
        photoLikes: PhotoLikes,
        description: Description,
        photoTimestamp: PhotoTimestamp,
        reviewID: ReviewID,
        summaryID: SummaryID,
      },
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    console.error('Error inserting Photo:', error);
    return false;
  });
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
};
