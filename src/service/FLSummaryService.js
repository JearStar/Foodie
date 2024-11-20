const appService = require('../../appService');

async function insertFLSummary(foodLocationSummary) {
  return await appService.withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO FoodLocationSummary (SUMMARYID, AVERAGERATING, DESCRIPTION, FOODLOCATIONNAME, ADDRESS, POSTALCODE, COUNTRY) 
VALUES (:summaryID, :averageRating, :description, :foodLocationName, :address, :postalCode, :country)`,
      {
        summaryID: foodLocationSummary.summaryID,
        averageRating: foodLocationSummary.averageRating,
        description: foodLocationSummary.description,
        foodLocationName: foodLocationSummary.foodLocationName,
        address: foodLocationSummary.foodLocationName,
        postalCode: foodLocationSummary.postalCode,
        country: foodLocationSummary.country,
      },
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  });
}

module.exports = {
  insertFLSummary,
};
