const { withOracleDB } = require('../../appService');

async function insertUser(user) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO APPUSER (USERID, EMAIL, PASSWORD, NUMREVIEWS) VALUES (SYS_GUID(), :email, :password, 0)`,
      {
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

module.exports = {
  insertUser,
  updatePasswordWithEmail,
  updateEmailWithEmail,
  getUserInfoWithID,
};
