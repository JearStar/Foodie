const oracledb = require('oracledb');
const fs = require('fs');
const loadEnvFile = require('./utils/envUtil');

const envVariables = loadEnvFile('./.env');

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
  user: envVariables.ORACLE_USER,
  password: envVariables.ORACLE_PASS,
  connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`,
  poolMin: 1,
  poolMax: 3,
  poolIncrement: 1,
  poolTimeout: 60,
};

// initialize connection pool
async function initializeConnectionPool() {
  try {
    await oracledb.createPool(dbConfig);
    console.log('Connection pool started');
  } catch (err) {
    console.error('Initialization error: ' + err.message);
  }
}

async function closePoolAndExit() {
  console.log('\nTerminating');
  try {
    await oracledb.getPool().close(10); // 10 seconds grace period for connections to finish
    console.log('Pool closed');
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

initializeConnectionPool();

process.once('SIGTERM', closePoolAndExit).once('SIGINT', closePoolAndExit);

// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
  let connection;
  try {
    connection = await oracledb.getConnection(); // Gets a connection from the default pool
    return await action(connection);
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

// This function ignores all errors in the sql script and continues even if there are errors
async function executeSqlFile(connection, filePath) {
  const sql = await fs.promises.readFile(filePath, 'utf8');
  const statements = sql
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (let statement of statements) {
    try {
      await connection.execute(statement);
    } catch (e) {
      //   do nothing
    }
  }
}

// This function ignores all errors in the sql script and continues even if there are errors
async function executePlSqlFile(connection, filePath) {
  const plsql = await fs.promises.readFile(filePath, 'utf8');
  const blocks = plsql
    .split('/')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (let block of blocks) {
    try {
      await connection.execute(block);
    } catch (e) {
      //   do nothing
    }
  }
}

// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
  return await withOracleDB(async (connection) => {
    return true;
  }).catch(() => {
    return false;
  });
}

async function fetchDemotableFromDb() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute('SELECT * FROM DEMOTABLE');
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function runInitScriptSQL() {
  return await withOracleDB(async (connection) => {
    try {
      await connection.execute(`ALTER SESSION SET CURRENT_SCHEMA = ` + envVariables.ORACLE_USER);
      // await executeSqlFile(connection,'./scripts/sql/DropTables.sql')
      await executeSqlFile(connection, './scripts/sql/Init.sql');
      console.log('finished creation');
      return true;
    } catch (err) {
      console.log('failed to execute sql script ' + err.message);
      return false;
    }
  });
}

async function findUserPass(user) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute('SELECT Password FROM AppUser WHERE Email= :ema', [
      user,
    ]);
    return result.rows;
  }).catch(() => {
    return Promise.reject();
  });
}

async function makeNewAcc(user, pass) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      'INSERT INTO AppUser(UserID, Email, Password, NumReviews) VALUES (DEFAULT, :e, :p, 0)',
      [user, pass]
    );
    return true;
  }).catch(() => {
    return false;
  });
}

async function searchLocs(searchKey) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
        'SELECT * FROM FoodLocation WHERE (Lower(FoodLocationName) LIKE :s)',
        ['%'+searchKey+'%']
    );
    return result.rows;
  }).catch((e) => {
    Promise.reject(e.message);
  });
}

async function searchSummaries(searchKey) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
        'SELECT * FROM FoodLocationSummary WHERE (Lower(FoodLocationName) LIKE :s)',
        ['%'+searchKey+'%']
    );
    return result.rows;
  }).catch((e) => {
    Promise.reject(e.message);
  });
}

async function initiateDemotable() {
  return await withOracleDB(async (connection) => {
    try {
      await connection.execute(`DROP TABLE DEMOTABLE`);
    } catch (err) {
      console.log('Table might not exist, proceeding to create...');
    }

    const result = await connection.execute(`
            CREATE TABLE DEMOTABLE (
                id NUMBER PRIMARY KEY,
                name VARCHAR2(20)
            )
        `);
    return true;
  }).catch(() => {
    return false;
  });
}

async function insertDemotable(id, name) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO DEMOTABLE (id, name) VALUES (:id, :name)`,
      [id, name],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function updateNameDemotable(oldName, newName) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE DEMOTABLE SET name=:newName where name=:oldName`,
      [newName, oldName],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function countDemotable() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute('SELECT Count(*) FROM DEMOTABLE');
    return result.rows[0][0];
  }).catch(() => {
    return -1;
  });
}

module.exports = {
  testOracleConnection,
  fetchDemotableFromDb,
  initiateDemotable,
  insertDemotable,
  makeNewAcc,
  updateNameDemotable,
  findUserPass,
  searchLocs,
  searchSummaries,
  countDemotable,
  runInitScriptSQL,
  withOracleDB,
};
