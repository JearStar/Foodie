class Comment {
  get commentID() {
    return this._commentID;
  }

  set commentID(value) {
    this._commentID = value;
  }

  get commentLikes() {
    return this._commentLikes;
  }

  set commentLikes(value) {
    this._commentLikes = value;
  }

  get content() {
    return this._content;
  }

  set content(value) {
    this._content = value;
  }

  get commentTimestamp() {
    return this._commentTimestamp;
  }

  set commentTimestamp(value) {
    this._commentTimestamp = value;
  }

  get reviewID() {
    return this._reviewID;
  }

  set reviewID(value) {
    this._reviewID = value;
  }

  get parentCommentID() {
    return this._parentCommentID;
  }

  set parentCommentID(value) {
    this._parentCommentID = value;
  }

  get userID() {
    return this._userID;
  }

  set userID(value) {
    this._userID = value;
  }
  constructor(commentID, commentLikes, content, commentTimestamp, reviewID, parentCommentID, userID) {
    this._commentID = commentID;
    this._commentLikes = commentLikes;
    this._content = content;
    this._commentTimestamp = commentTimestamp;
    this._reviewID = reviewID;
    this._parentCommentID = parentCommentID;
    this._userID = userID;
  }
}

module.exports = Comment;
