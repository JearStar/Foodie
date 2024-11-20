const express = require('express');
const appService = require('./appService');

const router = express.Router();
const userRouter = require('./src/controller/UserController');

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.

router.use('/users', userRouter);

router.post('/run-init-script-sql', async (req, res) => {
  const initiateResult = await appService.runInitScriptSQL();
  if (initiateResult) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

router.get('/check-db-connection', async (req, res) => {
  const isConnect = await appService.testOracleConnection();
  if (isConnect) {
    res.send('connected');
  } else {
    res.send('unable to connect');
  }
});

router.post('/newAcc', async (req, res) => {
  const user = req.body['user'];
  const pass = req.body['pass'];
  try {
    const result = await appService.findUserPass(user);
    if (exists(result, pass)) {
      res.status(400).json({ status: 'Account with this username and password exists.' });
    } else {
      const result2 = await appService.makeNewAcc(user, pass);
      if (result2 === true) {
        res.status(200).json({ status: 'Successful.' });
      } else {
        res.status(500).json({ status: 'Database error' });
      }
    }
  } catch (err) {
    res.status(500).json({ status: 'Database error' });
  }
});

function exists(arr, search) {
  return arr.some((row) => row.includes(search));
}

router.get('/demotable', async (req, res) => {
  const tableContent = await appService.fetchDemotableFromDb();
  res.json({ data: tableContent });
});

router.post('/initiate-demotable', async (req, res) => {
  const initiateResult = await appService.initiateDemotable();
  if (initiateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

router.post('/insert-demotable', async (req, res) => {
  const { id, name } = req.body;
  const insertResult = await appService.insertDemotable(id, name);
  if (insertResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

router.post('/update-name-demotable', async (req, res) => {
  const { oldName, newName } = req.body;
  const updateResult = await appService.updateNameDemotable(oldName, newName);
  if (updateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

router.get('/count-demotable', async (req, res) => {
  const tableCount = await appService.countDemotable();
  if (tableCount >= 0) {
    res.json({
      success: true,
      count: tableCount,
    });
  } else {
    res.status(500).json({
      success: false,
      count: tableCount,
    });
  }
});

module.exports = router;
