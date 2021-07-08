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

    return res
        .json({done: true})
        .status(200);
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

exports.getOnePill = async (req, res) => {
    const { id } = req.params;
    if(!id) 
        return res
        .json({done: false, message: 'id pill empty'})
        .status(400);

    try {
        const pill = await Pills.findOne({_id: id});
        if(!pill)
            return res
                .json({done: false, message: 'Pill not found'})
                .status(404);

        return res.json({done: true, results: pill});
    }
    catch(err) {
        throw new Error(`Error finding id / ${err}`)
    }
}