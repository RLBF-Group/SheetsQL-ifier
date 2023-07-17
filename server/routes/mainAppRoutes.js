const express = require('express');
const router = express.Router();

//REQUIRE CONTROLLERS
const mainAppController = require('../controllers/mainAppController');

router.get('/', mainAppController.execTerminal, (req, res) => {
    return res.status(200).send(res.locals.database);
})

//export router
module.exports = router;
