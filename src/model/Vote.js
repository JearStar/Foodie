class Vote {
  constructor(voteID, value, userID, commentID) {
    this._voteID = voteID;
    this._value = value;
    this._userID = userID;
    this._commentID = commentID;
  }

  get voteID() {
    return this._voteID;
  }

  set voteID(value) {
    this._voteID = value;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  get userID() {
    return this._userID;
  }

  set userID(value) {
    this._userID = value;
  }

  get commentID() {
    return this._commentID;
  }

  set commentID(value) {
    this._commentID = value;
  }
}
module.exports = Vote;
