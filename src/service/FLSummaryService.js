const appService = require('../../appService');
const {withOracleDB} = require("../../appService");

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
async function getFoodLocationSummaryInfo(foodLocationSummaryID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM FOODLOCATIONSUMMARY WHERE SUMMARYID=:foodLocationSummaryID', {
            foodLocationSummaryID: foodLocationSummaryID
        });
        if (result.rows.length === 0) {
            return {};
        }
        return result.rows.map((row) => {
            return {
                summaryID: row[0],
                averageRating: row[1],
                description: row[2]
            };
        });
    });
}

async function searchSummaries(query) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
        query
    );
    return result.rows;
  }).catch((e) => {
    Promise.reject(e.message);
  });
}

module.exports = {
  insertFLSummary,
  searchSummaries,
    getFoodLocationSummaryInfo
};
