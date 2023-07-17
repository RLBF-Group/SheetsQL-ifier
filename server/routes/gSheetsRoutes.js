const express = require('express');
const fs = require('fs');
const router = express.Router();


//REQUIRE CONTROLLERS
const gSheetsController = require('../controllers/gSheetsController.js');
const sqlController = require('../controllers/sqlController');

router.post(
  '/',
  gSheetsController.testGetData,
  sqlController.createTable,
  (req, res) => {
    return res.status(200).json(res.locals.sheetData);
  }
);

//export router
module.exports = router;
