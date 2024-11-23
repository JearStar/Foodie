const appService = require('../../appService');
const { withOracleDB } = require('../../appService');

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

async function searchSummaries(searchKey) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
        'SELECT * FROM FoodLocationSummary WHERE (Lower(FoodLocationName) LIKE :s)',
        ['%'+searchKey+'%']
    );
    return result.rows;
  }).catch((e) => {
    Promise.reject(e.message);
  });
}

module.exports = {
  insertFLSummary,
  searchSummaries
};
