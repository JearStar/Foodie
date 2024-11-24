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
    const result = await connection.execute('SELECT * FROM USERCOMMENT WHERE USERID=:userID', {
      userID: userID
    });
    return result.rows.map((row) => {
      return {
        commentID: row[0],
        commentLikes: row[1],
        content: row[2],
        contentTimestamp: row[3],
        reviewID: row[4],
        parentCommentID: row[5],
        userID: row[6]
      };
    });
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

      return {
        commentID: result.rows[0][0],
        commentLikes: result.rows[0][1],
        content: result.rows[0][2],
        contentTimestamp: result.rows[0][3],
        reviewID: result.rows[0][4],
        parentCommentID: result.rows[0][5],
        userID: result.rows[0][6]
      };
  });
}

async function getReplies(commentID) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute('SELECT * FROM USERCOMMENT WHERE PARENTCOMMENTID=:parentCommentID', {
      parentCommentID: commentID
    });
    return result.rows.map((row) => {
      return {
        commentID: row[0],
        commentLikes: row[1],
        content: row[2],
        contentTimestamp: row[3],
        reviewID: row[4],
        parentCommentID: row[5],
        userID: row[6]
      };
    });
  });
}


async function getCommentReview(userID) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
        'SELECT * FROM USERCOMMENT WHERE USERID=:userID',
        { userID: userID }
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows.map((row) => {
      return {
        commentLikes: row[1],
        commentContent: row[2],
        commentTimestamp: row[3],
        reviewID: row[4]
      };
    });
  });
}

module.exports = {
  addComment,
  updateCommentContent,
  incrementCommentLikes,
  getCommentsFromUser,
  getComment,
  getReplies,
  getCommentReview,
};
