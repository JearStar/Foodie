class Comment {
  constructor(
    commentID,
    commentLikes,
    content,
    commentTimestamp,
    parentID,
    parentType,
    userID
  ) {
    this._commentID = commentID;
    this._commentLikes = commentLikes;
    this._content = content;
    this._commentTimestamp = commentTimestamp;
    this._parentID = parentID;
    this._parentType = parentType;
    this._userID = userID;
  }
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

  get parentID() {
    return this._parentID;
  }

  set parentID(value) {
    this._parentID = value;
  }

  get parentType() {
    return this._parentType;
  }

  set parentType(value) {
    this._parentType = value;
  }

  get userID() {
    return this._userID;
  }

  set userID(value) {
    this._userID = value;
  }
}
