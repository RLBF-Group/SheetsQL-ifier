const express = require('express');
const router = express.Router();

//REQUIRE CONTROLLERS
const sqlController = require('../controllers/sqlController.js');

router.post('/', sqlController.createTable, (req, res) => {
  return res
    .status(200)
    .send('You made a request to the back end and this is the response.');
});

//export router
module.exports = router;
