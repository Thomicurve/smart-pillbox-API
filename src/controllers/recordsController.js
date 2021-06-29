require('../database/db');
const Record = require('../models/records');


exports.submitRecord = async (req, res) => {
    const { pillName, pillDate, amount, repeat } = req.body;
    
    if(!pillName || !pillDate || !amount || !repeat) 
        return res
            .json({ message: 'Data empty', done: false,})
            .status(403);

    try{
        const record = new Record({
            pillName,
            repeat,
            pillDate,
            idUser: req.userId,
            amount
        })

        record.pillDate = record.formatPillDate(record.pillDate);
        await record.save();

        return res
            .json({done: true})
            .status(200);
    }
    catch {
        throw new Error('error on submiting a new record')
    }
}

exports.getRecords = async (req, res) => {
    const records = await Record.find({idUser: req.userId}, (err) => {
        return err;
    })
    
    return res
        .json({records: records})
        .status(200);
}
