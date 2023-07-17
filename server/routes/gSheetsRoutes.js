const express = require('express');
const router = express.Router();


//REQUIRE CONTROLLERS
const gSheetsController = require('../controllers/gSheetsController');

router.get('/', gSheetsController.getSheet, (req, res) => {
    return res.status(200).send(res.locals.rowData);
})



//export router
module.exports = router;
