const appService = require('../../appService');

async function insertFoodLocation(foodLocation) {
  return await appService.withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO FoodLocation 
    (FOODLOCATIONNAME, NUMREVIEWS, ADDRESS, CITY, POSTALCODE, COUNTRY, GENRE, FOODLOCATIONSUMMARYID) 
VALUES (:name, :numReviews, :address, :city, :postalCode, :country, :genre, :summaryID)`,
      {
        name: foodLocation.foodLocationName,
        numReviews: foodLocation.numReviews,
        address: foodLocation.address,
        city: foodLocation.city,
        postalCode: foodLocation.postalCode,
        country: foodLocation.country,
        genre: foodLocation.genre,
        summaryID: foodLocation.summaryID,
      },
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  });
}

async function updateFoodLocationSummaryID(name, address, postalCode, country, newSummaryID) {
  return await appService.withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE FoodLocation 
SET FOODLOCATIONSUMMARYID=:newSummaryID 
WHERE FOODLOCATIONNAME=:name AND 
      ADDRESS=:address AND 
      POSTALCODE=:postalCode AND 
      COUNTRY=:country`,
      {
        name: name,
        address: address,
        postalCode: postalCode,
        country: country,
        newSummaryID: newSummaryID,
      },
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  });
}
module.exports = {
  insertFoodLocation,
  updateFoodLocationSummaryID,
};
