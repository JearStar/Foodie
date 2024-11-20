class LimitedTimeDish {
  constructor(dishName, foodLocationName, address, postalCode, country, startDate, endDate) {
    this._dishName = dishName;
    this._foodLocationName = foodLocationName;
    this._address = address;
    this._city = city;
    this._postalCode = postalCode;
    this._country = country;
    this._startDate = startDate;
    this._endDate = endDate;
  }

  get getDishName() {
    return this._dishName;
  }

  set setDishName(value) {
    this._dishName = value;
  }

  get getFoodLocationName() {
    return this._foodLocationName;
  }

  set setFoodLocationName(value) {
    this._foodLocationName = value;
  }

  get getAddress() {
    return this._address;
  }

  set setAddress(value) {
    this._address = value;
  }

  get getCity() {
    return this._city;
  }

  set setCity(value) {
    this._city = value;
  }

  get getPostalCode() {
    return this._postalCode;
  }

  set setPostalCode(value) {
    this._postalCode = value;
  }

  get getCountry() {
    return this._country;
  }

  set setCountry(value) {
    this._country = value;
  }

  get getStartDate() {
    return this._startDate;
  }

  set setStartDate(value) {
    this._startDate = value;
  }

  get getEndDate() {
    return this._endDate;
  }

  set setEndDate(value) {
    this._endDate = value;
  }
}
module.exports = LimitedTimeDish;