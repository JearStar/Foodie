import {withOracleDB} from "../../appService";

const Service = require ("../../appService")

//INSERT Dish
export async function insertDish(DishName, Price, Type, isHalal, isGlutenFree, isVegetarian, FoodLocationName, Address, PostalCode, Country)
{
    return await Service.withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO Dish (DishName, Price, Type, isHalal, isGlutenFree, isVegetarian, FoodLocationName, Address, PostalCode, Country) VALUES (:DishName, :Price, :Type, :isHalal, :isGlutenFree, :isVegetarian, :FoodLocationName, :Address, :PostalCode, :Country)`,
            {DishName, Price, Type, isHalal, isGlutenFree, isVegetarian, FoodLocationName, Address, PostalCode, Country},
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        console.error('Error inserting Dish:', error);
        return false;
    });
}