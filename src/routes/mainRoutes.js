const express = require('express');
const router = express.Router();

const { submitRecord, getRecords } = require('../controllers/recordsController');
const { register, login } = require('../controllers/authController');
const {userAlreadyLogged, userMustBeLogged} = require('../controllers/verifyToken')

// RECORDS
router.get('/records', userMustBeLogged);
router.get('/records', getRecords);

router.post('/new-record', userMustBeLogged);
router.post('/new-record', submitRecord);


// LOGIN & REGISTER
router.post('/register', userAlreadyLogged);
router.post('/register', register);

router.post('/login', userAlreadyLogged);
router.post('/login', login);


module.exports = router;