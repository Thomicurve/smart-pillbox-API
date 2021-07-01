const Pills = require('../models/pills');

exports.submitPills = async (req, res) => {
    const { 
        pillName, 
        repeat, 
        pillHour,
        amount } = req.body;

    if(!pillName || !repeat || !pillHour || !amount)
        return res
            .json({message: 'Data empty', done: false})
            .status(403);

    // PILLHOUR = 05:20 PM
    const pill = new Pills({
        pillName,
        repeat,
        pillHour,
        amount,
        idUser: req.userId
    });
    await pill.save();

    res.json({done: true});
}


exports.getPills = async (req, res) => {
    try {
        const resultsPills = await Pills.find({idUser: req.userId});
        return res.json({pills: resultsPills});
    }
    catch(err) {
        throw new Error(`error getting pills ${err}`);
    }
}