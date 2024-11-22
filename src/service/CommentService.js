const { withOracleDB } = require('../../appService');

async function addComment(comment) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO USERCOMMENT (COMMENTID, COMMENTLIKES, CONTENT, COMMENTTIMESTAMP, PARENTID, PARENTTYPE, USERID) VALUES (:commentID, :commentLikes, :content, :commentTimestamp, :parentID, :parentType, :userID)`,
      {
        commentID: comment.commentID,
        commentLikes: comment.commentLikes,
        content: comment.content,
        commentTimestamp: comment.commentTimestamp,
        parentID: comment.parentID,
        parentType: comment.parentType,
        userID: comment.userID,
      },
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  });
}

async function updateCommentContent(commentID, newContent) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE USERCOMMENT SET content=:newContent where commentID=:commentID`,
      { newContent: newContent, commentID: commentID },
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  });
}

async function incrementCommentLikes(commentID) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE USERCOMMENT SET commentLikes = commentLikes + 1 where commentID=:commentID`,
      { commentID: commentID },
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  });
}

async function getCommentsFromUser(userID) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute('SELECT * FROM USERCOMMENT WHERE userID=:userID', [
      userID,
    ]);
    return result.rows;
  });
}

async function getComment(commentID) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      'SELECT * FROM USERCOMMENT WHERE commentID=:commentID',
      { commentID: commentID }
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  });
}

module.exports = {
  addComment,
  updateCommentContent,
  incrementCommentLikes,
  getCommentsFromUser,
  getComment,
};
