import {withOracleDB} from "../../appService";

const Service = require ("../../appService")

//INSERT Photo
export async function insertPhoto(PhotoID, Image, PhotoLikes, Description, Timestamp, ReviewID, SummaryID)
{
    return await Service.withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO Photo (PhotoID, Image, PhotoLikes, Description, Timestamp, ReviewID, SummaryID) VALUES (:PhotoID, :Image, :PhotoLikes, :Description, :Timestamp, :ReviewID, :SummaryID)`,
            {PhotoID, Image, PhotoLikes, Description, Timestamp, ReviewID, SummaryID},
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        console.error('Error inserting Photo:', error);
        return false;
    });
}

//DELETE Photo
export async function deletePhoto(removePhotoID, removeImage, removePhotoLikes, removeDescription, removeTimestamp, removeReviewID, removeSummaryID) {
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
                {removePhotoID, removeImage, removePhotoLikes, removeDescription, removeTimestamp, removeReviewID, removeSummaryID},
                { autoCommit: true }
            );

            return result.rowsAffected && result.rowsAffected > 0;
        } catch (error) {
            console.error('Error deleting Photo:', error);
            return false;
        }
    });
}


