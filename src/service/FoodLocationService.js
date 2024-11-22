const appService = require('../../appService');
const { withOracleDB } = require('../../appService');

const {generateUUID} = require("../Helper");

async function insertFoodLocation(foodLocation) {
  return await appService.withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO FoodLocation 
    (FOODLOCATIONNAME, NUMREVIEWS, ADDRESS, CITY, POSTALCODE, COUNTRY, GENRE, FOODLOCATIONSUMMARYID) 
VALUES (:name, :numReviews, :address, :city, :postalCode, :country, :genre, :summaryID)`,
        {
            name: foodLocation.foodLocationName,
            numReviews: 0,
            address: foodLocation.address,
            city: foodLocation.city,
            postalCode: foodLocation.postalCode,
            country: foodLocation.country,
            genre: foodLocation.genre,
            summaryID: generateUUID()

        }
        ,
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

async function searchLocs(searchKey) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
        'SELECT * FROM FoodLocation WHERE (Lower(FoodLocationName) LIKE :s)',
        ['%'+searchKey+'%']
    );
    return result.rows;
  }).catch((e) => {
    Promise.reject(e.message);
  });
}

async function getFoodLocationInfoWithSummaryID(FoodLocationSummaryID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM FOODLOCATION WHERE FOODLOCATIONSUMMARYID=:FoodLocationSummaryID', {
            FoodLocationSummaryID: FoodLocationSummaryID,
        });
        if (result.rows.length === 0) {
            return {};
        }
        return result.rows.map((row) => {
            return {
                name: row[0],
                numReviews: row[1],
                address: row[2],
                city: row[3],
                postalCode: row[4],
                country: row[5],
                genre: row[6]
            };
        });
    });
}

module.exports = {
  insertFoodLocation,
  updateFoodLocationSummaryID,
  getFoodLocationInfoWithSummaryID,
  searchLocs
};
