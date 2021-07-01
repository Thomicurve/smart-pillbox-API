const Record = require('../models/records');


exports.submitRecord = async (req, res) => {
    const { pillName, pillDate, amount } = req.body;
    
    if(!pillName || !pillDate || !amount) 
        return res
            .json({ message: 'Data empty', done: false,})
            .status(403);

    try{
        const record = new Record({
            pillName,
            pillDate,
            idUser: req.userId,
            amount
        })
        record.pillDate = record.formatDate(record.pillDate); 
        await record.save();

        return res
            .json({done: true})
            .status(200);
    }
    catch(err) {
        console.log(err);
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

