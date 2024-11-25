const { withOracleDB } = require('../../appService');

async function insertVote(vote) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO VOTE (VOTEID, USERID, PHOTOID, COMMENTID) VALUES (:voteID, :userID, :photoID, :commentID)`,
      {
        voteID: vote.voteID,
        userID: vote.userID,
        photoID: vote.photoID,
        commentID: vote.commentID,
      },
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  });
}

async function deleteCommentLike(commentID, userID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM VOTE WHERE COMMENTID=:commentID AND USERID=:userID`,
            {
                userID: userID,
                commentID: commentID,
            },
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    });
}

async function getCommentLikes(commentID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT COUNT(*) FROM VOTE WHERE COMMENTID=:commentID`,
            {
                commentID: commentID,
            },
            { autoCommit: true }
        );
        if (result.rows.length === 0) {
            return 0;
        }
        return result.rows[0][0];
    });
}

async function commentLikedByUser(commentID, userID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * FROM VOTE WHERE COMMENTID=:commentID AND USERID=:userID`,
            {
                commentID: commentID,
                userID: userID
            },
            { autoCommit: true }
        );
        return result.rows.length !== 0;
    });
}

async function updateVoteValueToLike(voteID) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE VOTE SET VALUE=1 WHERE VOTEID=:voteID`,
      {
        voteID: voteID,
      },
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  });
}
async function updateVoteValueToDislike(voteID) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE VOTE SET VALUE=0 WHERE VOTEID=:voteID`,
      {
        voteID: voteID,
      },
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  });
}

module.exports = {
    deleteCommentLike,
    getCommentLikes,
    commentLikedByUser,
    insertVote,
    updateVoteValueToLike,
    updateVoteValueToDislike,
};
