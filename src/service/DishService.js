const Service = require('../../appService');

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
module.exports = {
  insertDish,
};
