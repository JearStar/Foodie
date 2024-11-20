class FoodLocation {
  constructor(foodLocationName, numReviews, address, city, postalCode, country, genre, summaryID) {
    this._foodLocationName = foodLocationName;
    this._numReviews = numReviews;
    this._address = address;
    this._city = city;
    this._postalCode = postalCode;
    this._country = country;
    this._genre = genre;
    this._summaryID = summaryID;
  }

  get getFoodLocationName() {
    return this._foodLocationName;
  }

  set setFoodLocationName(value) {
    this._foodLocationName = value;
  }

  get getNumReviews() {
    return this._numReviews;
  }

  set setNumReviews(value) {
    this._numReviews = value;
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

  get getGenre() {
    return this._genre;
  }

  set setGenre(value) {
    this._genre = value;
  }

  get getSummaryID() {
    return this._summaryID;
  }

  set setSummaryID(value) {
    this._summaryID = value;
  }
}
module.exports = FoodLocation;