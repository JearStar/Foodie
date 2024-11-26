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

async function getDishesWithFields(name, address, postalCode, country, showPrice, showType, showIsHalal, showIsGlutenFree, showIsVegetarian) {
    return await withOracleDB(async (connection) => {
        const selectedFields = ['DISHNAME']; // Always include "DISHNAME"
        if (showPrice == true) selectedFields.push('PRICE');
        if (showType == true) selectedFields.push('TYPE');
        if (showIsHalal == true) selectedFields.push('ISHALAL');
        if (showIsGlutenFree == true) selectedFields.push('ISGLUTENFREE');
        if (showIsVegetarian == true) selectedFields.push('ISVEGETARIAN');
        const selectedFieldsString = selectedFields.join(', ');

        const query = `
            SELECT ${selectedFieldsString}
            FROM DISH
            WHERE FOODLOCATIONNAME = :name AND ADDRESS = :address AND POSTALCODE = :postalCode AND COUNTRY = :country
        `;

        const result = await connection.execute(query, {
            name: name,
            address: address,
            postalCode: postalCode,
            country: country
        });

        if (result.rows.length === 0) {
            return {};
        }

        return result.rows.map((row) => {
            const dish = { dishName: row[0] };
            let columnIndex = 1;

            if (showPrice) dish.price = row[columnIndex++];
            if (showType) dish.type = row[columnIndex++];
            if (showIsHalal) dish.isHalal = row[columnIndex++];
            if (showIsGlutenFree) dish.isGlutenFree = row[columnIndex++];
            if (showIsVegetarian) dish.isVegetarian = row[columnIndex++];

            return dish;
        });

    });
}

module.exports = {
  insertDish,
    getDishInfo,
    getDishesWithFields
};
