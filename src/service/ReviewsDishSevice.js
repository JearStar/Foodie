
import {withOracleDB} from "../../appService";
const Service = require ("../../appService")

//INSERT ReviewsDish
export async function insertReviewsDish(DishName, Price, Type, isHalal, isGlutenFree, isVegetarian, FoodLocationName, Address, PostalCode, Country)
{
    return await Service.(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO ReviewsDish (ReviewID, DishName, DishRating) VALUES (:ReviewID, :DishName, :DishRating)`,
            {ReviewID, DishName, DishRating},
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        console.error('Error inserting Reviews Dish:', error);
        return false;
    });
}
