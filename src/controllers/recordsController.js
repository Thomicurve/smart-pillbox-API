const Record = require('../models/records');
const moment = require('moment');


exports.submitRecord = async (req, res) => {
    const { pillName, pillDate, amount } = req.body;
    
    if(!pillName || !pillDate || !amount) 
        return res
            .json({ message: 'Faltan datos'})
            .status(400);

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
        throw new Error('Error al guardar el registro')
    }
}

// exports.getTodayRecords = async (req, res) => {
//     const records = await Record.find({pillDate: moment()}, (err) => {
//         return err
//     })

//     return res
//         .json({records})
//         .status(200);
// }

exports.getRecords = async (req, res) => {
    const records = await Record.find({idUser: req.userId}, (err) => {
        return err;
    })

    return res
        .json({records: records})
        .status(200);
}

exports.getOneRecord = async (req, res) => {
    const record = await Record.findById(req.params.id);
    if(!record)
        return res
            .json({done: false, message: 'Registro no encontrado'})
            .status(404);

    res
        .json({done: true, record: record})
        .status(200);
}

