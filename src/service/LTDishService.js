const appService = require("../../appService");

export async function insertLTDish(dishName, flName, address, postalCode, country,
                                   startDate, endDate) {
    return await appService.withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO LimitedTimeDish (dishName, flName, address, postalCode, country, startDate, 
                             endDate) VALUES (:dishName, :flName, :address, :postalCode, :country, :startDate,
                                              :endDate)`,
            {dishName, flName, address, postalCode, country, startDate, endDate},
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}