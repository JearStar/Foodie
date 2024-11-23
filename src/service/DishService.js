const Service = require('../../appService');
const {withOracleDB} = require("../../appService");

//INSERT Dish
async function insertDish(
  DishName,
  Price,
  Type,
  isHalal,
  isGlutenFree,
  isVegetarian,
  FoodLocationName,
  Address,
  PostalCode,
  Country
) {
  return await Service.withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO Dish (DishName, Price, Type, isHalal, isGlutenFree, isVegetarian, FoodLocationName, Address, PostalCode, Country) VALUES (:DishName, :Price, :Type, :isHalal, :isGlutenFree, :isVegetarian, :FoodLocationName, :Address, :PostalCode, :Country)`,
      {
        DishName: DishName,
        Price: Price,
        Type: Type,
        isHalal: isHalal,
        isGlutenFree: isGlutenFree,
        isVegetarian: isVegetarian,
        FoodLocationName: FoodLocationName,
        Address: Address,
        PostalCode: PostalCode,
        Country: Country,
      },
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  });
}

async function getDishInfo(name, address, postalCode, country) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM DISH WHERE FOODLOCATIONNAME=:name AND ADDRESS=:address AND POSTALCODE=:postalCode AND COUNTRY=:country', {
            name: name,
            address: address,
            postalCode: postalCode,
            country: country
        });
        if (result.rows.length === 0) {
            return {};
        }
        return result.rows.map((row) => {
            return {
                dishName: row[0],
                price: row[1],
                type: row[2],
                isHalal: row[3],
                isGlutenFree: row[4],
                isVegetarian: row[5]
            };
        });
    });
}
module.exports = {
  insertDish,
    getDishInfo
};
