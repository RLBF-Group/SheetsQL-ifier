const express = require('express');
// const app = express();
const router = express.Router();
const mainAppController = require('../controllers/mainAppController');


router.post('/api', mainAppController ,(req, res) => {
    
});

router.get('/readme', (req, res) => {
    
});
router.get('/about', (req, res) => {
    
});
router.get('/output', (req, res) => {
    
});
router.get('/form', (req, res) => {
    
});
module.exports = router;