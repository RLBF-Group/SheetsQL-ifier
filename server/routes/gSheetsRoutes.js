const express = require('express');
const fs = require('fs');
const router = express.Router();

//REQUIRE CONTROLLERS
const gSheetsController = require('../controllers/gSheetsController.js');
const sqlController = require('../controllers/sqlController');

// User submitted form on the front end
router.post(
  '/',
  sqlController.linkDb,
  gSheetsController.getData,
  sqlController.createTable,
  (req, res) => {
    res.status(200).json(res.locals.data);
  }
);

//make a /new post request
router.post(
  '/new',
  sqlController.linkDb, //establish connection to SQL database
  sqlController.readTable, //reads data from SQL
  // gSheetsController.createSheet, //creates a new sheet
  gSheetsController.updateSheet, //make a get request to populates the sheet with DB
  (req, res) => {
    res.status(200).json(res.locals.sheetURL); //send new sheet URL to user
  }
);

//export router
module.exports = router;
