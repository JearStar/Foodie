const appService = require('../../appService');

async function insertFoodLocation(foodLocation, foodLocationSummary) {
  return await appService.withOracleDB(async (connection) => {
      const result1 = await connection.execute(
          `INSERT INTO FoodLocation (FOODLOCATIONNAME, ADDRESS, POSTALCODE, COUNTRY, TOTALSCORE, NUMREVIEWS, CITY, GENRE, FOODLOCATIONSUMMARYID) VALUES (:name, :address, :postalCode, :country, 0, 0, :city, :genre, NULL)`,
          {
              name: foodLocation.foodLocationName,
              address: foodLocation.address,
              postalCode: foodLocation.postalCode,
              country: foodLocation.country,
              city: foodLocation.city,
              genre: foodLocation.genre,
          },
          { autoCommit: true }
      );
      const result2 = await connection.execute(
          `INSERT INTO FOODLOCATIONSUMMARY (SUMMARYID, AVERAGERATING, DESCRIPTION, FOODLOCATIONNAME, ADDRESS, POSTALCODE, COUNTRY) VALUES (:summaryID, 0, :description, :name, :address, :postalCode, :country)`,
          {
            summaryID: foodLocationSummary.summaryID,
            description: foodLocationSummary.description,
            name: foodLocationSummary.foodLocationName,
            address: foodLocationSummary.address,
            postalCode: foodLocationSummary.postalCode,
            country: foodLocationSummary.country
          },
          { autoCommit: true }
      );
      const result3 = await connection.execute(
          `UPDATE FoodLocation SET FoodLocationSummaryID = :summaryID WHERE FoodLocationName = :name AND Address = :address AND PostalCode = :postalCode AND COUNTRY = :country`,
          {
              summaryID: foodLocationSummary.summaryID,
              name: foodLocationSummary.foodLocationName,
              address: foodLocationSummary.address,
              postalCode: foodLocationSummary.postalCode,
              country: foodLocationSummary.country
          },
          { autoCommit: true }
      );
    return result3.rowsAffected && result3.rowsAffected > 0;
  });
}

async function updateFoodLocationSummaryID(name, address, postalCode, country, newSummaryID) {
  return await appService.withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE FoodLocation SET FOODLOCATIONSUMMARYID=:newSummaryID WHERE FOODLOCATIONNAME=:name AND ADDRESS=:address AND POSTALCODE=:postalCode AND COUNTRY=:country;`,
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
