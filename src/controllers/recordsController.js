require('../database/db');
const Record = require('../models/records');
const jwt = require('jsonwebtoken');


function verifyHeaders(req) {
    const token = req.headers['x-access-token'];
    
    if(!token) 
        return undefined;

    const idUser = jwt.verify(token, process.env.SECRET);

    return idUser;
}


exports.submitRecord = async (req, res) => {
    const { pillName, pillDate, amount } = req.body;
    const idUser = verifyHeaders(req);

    if(!idUser){
        return res
        .json({done: false,})
        .status(404);
    }
    
    if(!pillName || !pillDate || !amount) 
        return res
        .json({ message: 'Unexpected error', done: false,})
        .status(404);

    const record = new Record({
        pillName,
        pillDate,
        idUser,
        amount
    })

    await record.save();

    return res
    .json({done: true})
    .status(200);
}

exports.getRecords = async (req, res) => {
    const idUser = verifyHeaders(req);
    if(!idUser){
        return res
        .json({done: false, message: 'user not logged'})
        .status(404);
    }
    
    const records = await Record.find({idUser: idUser}, (err) => {
        return err;
    })
    
    return res.json({records: records})
}
