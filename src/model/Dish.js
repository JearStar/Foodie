class Dish {
  constructor(
    DishName,
    Price,
    Type,
    isHalal,
    isGlutenFree,
    isVegetarian,
    foodLocationName,
    address,
    postalCode,
    country
  ) {
    this._DishName = DishName;
    this._Price = Price;
    this._Type = Type;
    this._isHalal = isHalal;
    this._isGlutenFree = isGlutenFree;
    this._isVegetarian = isVegetarian;
    this._foodLocationName = foodLocationName;
    this._address = address;
    this._postalCode = postalCode;
    this._country = country;
  }

  // Getter and Setter for DishName
  get getDishName() {
    return this._DishName;
  }
  set setDishName(value) {
    this._DishName = value;
  }

  // Getter and Setter for Price
  get getPrice() {
    return this._Price;
  }
  set setPrice(value) {
    if (value < 0) {
      console.log('Price cannot be negative.');
    } else {
      this._Price = value;
    }
  }

  // Getter and Setter for Type
  get getType() {
    return this._Type;
  }
  set setType(value) {
    this._Type = value;
  }

  // Getter and Setter for isHalal
  get getIsHalal() {
    return this._isHalal;
  }
  set setIsHalal(value) {
    this._isHalal = Boolean(value);
  }

  // Getter and Setter for isGlutenFree
  get getIsGlutenFree() {
    return this._isGlutenFree;
  }
  set setIsGlutenFree(value) {
    this._isGlutenFree = Boolean(value);
  }

  // Getter and Setter for isVegetarian
  get getIsVegetarian() {
    return this._isVegetarian;
  }
  set setIsVegetarian(value) {
    this._isVegetarian = Boolean(value);
  }

  // Getter and Setter for foodLocationName
  get getFoodLocationName() {
    return this._foodLocationName;
  }
  set setFoodLocationName(value) {
    this._foodLocationName = value;
  }

  // Getter and Setter for address
  get getAddress() {
    return this._address;
  }
  set setAddress(value) {
    this._address = value;
  }

  // Getter and Setter for postalCode
  get getPostalCode() {
    return this._postalCode;
  }
  set setPostalCode(value) {
    this._postalCode = value;
  }

  // Getter and Setter for country
  get getCountry() {
    return this._country;
  }
  set setCountry(value) {
    this._country = value;
  }
}
module.exports = Dish;