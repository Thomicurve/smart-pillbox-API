require('../database/db');
const express = require('express');
const router = express.Router();

const { submitRecord, getRecords , getOneRecord} = require('../controllers/recordsController');
const { register, login } = require('../controllers/authController');
const { getPills, submitPills, getOnePill} = require('../controllers/pillsController');
const { userAlreadyLogged, userMustBeLogged} = require('./verifyToken');

// RECORDS
router.get('/records', userMustBeLogged);
router.get('/records', getRecords);

router.post('/new-record', userMustBeLogged);
router.post('/new-record', submitRecord);

router.get('/record/:id', userMustBeLogged);
router.get('/record/:id', getOneRecord);


// PILLS
router.get('/pills', userMustBeLogged);
router.get('/pills', getPills);

router.post('/new-pill', userMustBeLogged);
router.post('/new-pill', submitPills);

router.get('/pill/:id', userMustBeLogged);
router.get('/pill/:id', getOnePill);


// LOGIN & REGISTER
router.post('/register', userAlreadyLogged);
router.post('/register', register);

router.post('/login', userAlreadyLogged);
router.post('/login', login);


module.exports = router;