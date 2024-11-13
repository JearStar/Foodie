const appService = require("../../appService");

export async function insertFoodLocation(name, numReviews, address, city, postalCode,
                                         country, genre, summaryID) {
    return await appService.withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO FoodLocation (name, numReviews, address, city, postalCode, country, genre, 
                          summaryID) VALUES (:name, :numReviews, :address, :city, :postalCode, :country, :genre,
                                             :summaryID)`,
            {name, numReviews, address, city, postalCode, country, genre, summaryID},
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

export async function updateFoodLocation(name, newSummaryID) {
    return await appService.withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE FoodLocation SET summaryID=:newSummaryID where name=:name`,
            {name, newSummaryID},
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}