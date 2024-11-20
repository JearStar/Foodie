class Review {
  constructor(
    reviewID,
    overallRating,
    serviceRating,
    waitTimeRating,
    dayOfWeekVisited,
    reviewTimeStamp,
    foodLocationName,
    address,
    postalCode,
    country,
    userID
  ) {
    this._reviewID = reviewID;
    this._overallRating = overallRating;
    this._serviceRating = serviceRating;
    this._waitTimeRating = waitTimeRating;
    this._dayOfWeekVisited = dayOfWeekVisited;
    this._reviewTimeStamp = reviewTimeStamp;
    this._foodLocationName = foodLocationName;
    this._address = address;
    this._postalCode = postalCode;
    this._country = country;
    this._userID = userID;
  }

  // Getter and Setter for reviewID
  get getReviewID() {
    return this._reviewID;
  }
  set setReviewID(value) {
    this._reviewID = value;
  }

  // Getter and Setter for overallRating
  get getOverallRating() {
    return this._overallRating;
  }
  set setOverallRating(value) {
    this._overallRating = value;
  }

  // Getter and Setter for serviceRating
  get getServiceRating() {
    return this._serviceRating;
  }
  set setServiceRating(value) {
    this._serviceRating = value;
  }

  // Getter and Setter for waitTimeRating
  get getWaitTimeRating() {
    return this._waitTimeRating;
  }
  set setWaitTimeRating(value) {
    this._waitTimeRating = value;
  }

  // Getter and Setter for dayOfWeekVisited
  get getDayOfWeekVisited() {
    return this._dayOfWeekVisited;
  }
  set setDayOfWeekVisited(value) {
    this._dayOfWeekVisited = value;
  }

  // Getter and Setter for reviewTimeStamp
  get getReviewTimeStamp() {
    return this._reviewTimeStamp;
  }
  set setReviewTimeStamp(value) {
    this._reviewTimeStamp = value;
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

  // Getter and Setter for userID
  get getUserID() {
    return this._userID;
  }
  set setUserID(value) {
    this._userID = value;
  }
}
module.exports = Review;
