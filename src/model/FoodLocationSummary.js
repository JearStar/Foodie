class FoodLocationSummary {
  constructor(
    summaryID,
    averageRating,
    description,
    foodLocationName,
    address,
    city,
    postalCode,
    country
  ) {
    this._summaryID = summaryID;
    this._averageRating = averageRating;
    this._description = description;
    this._foodLocationName = foodLocationName;
    this._address = address;
    this._city = city;
    this._postalCode = postalCode;
    this._country = country;
  }

  get getSummaryID() {
    return this._summaryID;
  }

  set setSummaryID(value) {
    this._summaryID = value;
  }

  get getAverageRating() {
    return this._averageRating;
  }

  set setAverageRating(value) {
    this._averageRating = value;
  }

  get getDescription() {
    return this._description;
  }

  set setDescription(value) {
    this._description = value;
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
}
