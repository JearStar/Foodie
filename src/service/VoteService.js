const { withOracleDB } = require('../../appService');

async function insertVote(vote) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO VOTE (VOTEID, VALUE, USERID, COMMENTID) VALUES (SYS_GUID(), :value, :userID, :commentID)`,
      {
        voteID: vote.voteID,
        value: vote.value,
        userID: vote.userID,
        commentID: vote.commentID,
      },
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
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
  insertVote,
  updateVoteValueToLike,
  updateVoteValueToDislike,
};
