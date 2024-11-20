const { withOracleDB } = require('../../appService');
const { bufferToUuid, convertBuffersToStrings, generateUUID } = require('../Helper');
const User = require('../model/User');

async function insertUser(user) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO APPUSER (USERID, EMAIL, PASSWORD, NUMREVIEWS) VALUES (:userID, :email, :password, 0)`,
      {
        userID: generateUUID(),
        email: user.email,
        password: user.password,
      },
      { autoCommit: true }
    );
    return result.rowsAffected && result.rowsAffected > 0;
  });
}

async function updatePasswordWithEmail(email, password) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE APPUSER SET PASSWORD=:password WHERE EMAIL=:email`,
      {
        email: email,
        password: password,
      },
      { autoCommit: true }
    );
    return result.rowsAffected && result.rowsAffected > 0;
  });
}

async function updateEmailWithEmail(oldEmail, newEmail) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE APPUSER SET EMAIL=:newEmail WHERE EMAIL=:oldEmail`,
      {
        oldEmail: oldEmail,
        newEmail: newEmail,
      },
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  });
}

async function getUserInfoWithID(userID) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute('SELECT * FROM APPUSER WHERE USERID=:userID', {
      userID: userID,
    });
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  });
}

async function getAll() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute('SELECT * FROM APPUSER');
    return result.rows.map((row) => {
      return {
        user: row[0],
        email: row[1],
        password: row[2],
        numReviews: row[3],
      };
    });
  });
}

module.exports = {
  insertUser,
  updatePasswordWithEmail,
  updateEmailWithEmail,
  getUserInfoWithID,
  getAll,
};
