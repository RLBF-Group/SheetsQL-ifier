const express = require('express');
const router = express.Router();

//REQUIRE CONTROLLERS
const sqlController = require('../controllers/sqlController.js');




router.post('/', sqlController.createTable ,(req, res) => {
    return res.sendStatus(200);
});



//export router
module.exports = router;

