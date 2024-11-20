const express = require('express');
const appService = require('../../appService');
const router = express.Router();
const userService = require('../service/UserService');
const User = require('../model/User');

/*
ENDPOINT: PUT /api/users/create-user
BODY: email, password
RETURNS: {success : boolean}
 */
router.put('/create-user', async (req, res) => {
  try {
    console.log("creating user object");
    const user = new User(null, req.body.email, req.body.password, null);
    console.log("trying query");
    const result = await userService.insertUser(user);
    if (!result) {
      return res.status(400).json({ success: false, error: 'Failed to create user' });
    }
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

/*
ENDPOINT: POST /api/users/change-password
BODY: email, password
RETURNS: {success : boolean}
 */
router.post('/change-password', async (req, res) => {
  try {
    const result = await userService.updatePasswordWithEmail(req.body.email, req.body.password);
    if (!result) {
      return res.status(400).json({
        success: false,
        error: 'Failed to update password for: ' + req.body.email,
      });
    }
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

/*
ENDPOINT: GET /api/users/get-user-info
BODY: userID
RETURNS ON SUCCESS: {success: boolean, data: { userID, email, password, numReviews }}
 */
router.get('/get-user-info', async (req, res) => {
  try {
    const result = await userService.getUserInfoWithID(req.body.userID);
    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Failed to get user: ' + req.body.userID,
      });
    }
    res.json({
      success: true,
      data: {
        userID: result.USERID,
        email: result.EMAIL,
        password: result.PASSWORD,
        numReviews: result.NUMREVIEWS,
      },
    });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

module.exports = router;
