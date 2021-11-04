require('../database/db');
const express = require('express');
const router = express.Router();

const { submitRecord, getRecords , getOneRecord, getTodayRecords} = require('../controllers/recordsController');
const { register, login, logout } = require('../controllers/authController');
const { getPills, submitPills, getOnePill, deletePill, editPill} = require('../controllers/pillsController');
const { userAlreadyLogged, userMustBeLogged} = require('./verifyToken');

// RECORDS
router.get('/records', userMustBeLogged);
router.get('/records', getRecords);

router.post('/new-record', userMustBeLogged);
router.post('/new-record', submitRecord);

router.get('/todayrecords', userMustBeLogged);
router.get('/todayrecords', getTodayRecords);

router.get('/record/:id', userMustBeLogged);
router.get('/record/:id', getOneRecord);


// PILLS
router.get('/pills', userMustBeLogged);
router.get('/pills', getPills);

router.post('/new-pill', userMustBeLogged);
router.post('/new-pill', submitPills);

router.get('/pill/:id', userMustBeLogged);
router.get('/pill/:id', getOnePill);

router.delete('/delete-pill/:id', userMustBeLogged);
router.delete('/delete-pill/:id', deletePill); 

router.put('/edit-pill/:id', userMustBeLogged);
router.put('/edit-pill/:id', editPill);



// AUTH
router.post('/register', userAlreadyLogged);
router.post('/register', register);

router.post('/login', userAlreadyLogged);
router.post('/login', login);

router.get('/logout', userMustBeLogged);
router.get('/logout', logout);


module.exports = router;