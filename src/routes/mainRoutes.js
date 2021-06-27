const express = require('express');
const router = express.Router();

const { submitRecord, getRecords } = require('../controllers/recordsController');
const { register, login } = require('../controllers/authController')


router.get('/records', getRecords);
router.post('/new-record', submitRecord);

router.post('/register', register);
router.post('/login', login);


module.exports = router;