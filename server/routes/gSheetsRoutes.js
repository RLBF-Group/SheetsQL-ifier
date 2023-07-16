const express = require('express');
const router = express.Router();

//REQUIRE CONTROLLERS
const mainAppController = require('../controllers/mainAppController');

router.get('/', (req, res) => {
  return res.status(200).send('some object');
});

//export router
module.exports = router;
