const appService = require('../../appService');

async function insertLTDish(limitedTimeDish) {
  return await appService.withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO LimitedTimeDish (DISHNAME, FOODLOCATIONNAME, ADDRESS, POSTALCODE, COUNTRY, STARTDATE, ENDDATE) 
VALUES (:dishName, :foodLocationName, :address, :postalCode, :country, :startDate, :endDate)`,
      {
        dishName: limitedTimeDish.dishName,
        foodLocationName: limitedTimeDish.foodLocationName,
        address: limitedTimeDish.address,
        postalCode: limitedTimeDish.postalCode,
        country: limitedTimeDish.country,
        startDate: limitedTimeDish.startDate,
        endDate: limitedTimeDish.endDate,
      },
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  });
}
module.exports = {
  insertLTDish,
};
