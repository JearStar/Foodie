const appService = require("../../appService");

export async function insertFLSummary(summaryID, avgRating, description, name, address,
                                      postalCode, country) {
    return await appService.withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO FoodLocationSummary (summaryID, avgRating, description, name, address, postalCode, 
                                 country) VALUES (:summaryID, :avgRating, :description, :name, :address, :postalCode,
                                                  :country)`,
            {summaryID, avgRating, description, name, address, postalCode, country},
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}
