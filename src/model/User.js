class User {
  constructor(userID, email, password, numReviews) {
    this._userID = userID;
    this._email = email;
    this._password = password;
    this._numReviews = numReviews;
  }

  get userID() {
    return this._userID;
  }

  set userID(value) {
    this._userID = value;
  }

  get email() {
    return this._email;
  }

  set email(value) {
    this._email = value;
  }

  get password() {
    return this._password;
  }

  set password(value) {
    this._password = value;
  }

  get numReviews() {
    return this._numReviews;
  }

  set numReviews(value) {
    this._numReviews = value;
  }
}