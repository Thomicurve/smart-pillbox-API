const Pills = require('../models/pills');
const { verifyIdentity } = require('../routes/authRoutes');

async function verifyUser(req, id, model) {
    const verifyResult = await verifyIdentity({ req, id, model });
    if (!verifyResult) return false;
    else return true;
}

exports.submitPills = async (req, res) => {
    const {
        pillName,
        repeat,
        pillHour,
        amount } = req.body;

    if (!pillName || !repeat || !pillHour || !amount)
        return res
            .json({ message: 'Faltan datos', done: false })
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
        .json({ message: 'Pastilla cargada con éxito' })
        .status(200);
}


exports.getPills = async (req, res) => {
    try {
        const resultsPills = await Pills.find({ idUser: req.userId });
        return res.json({ pills: resultsPills });
    }
    catch (err) {
        throw new Error(`Error obteniendo las pastillas ${err}`);
    }
}

exports.getOnePill = async (req, res) => {
    const { id } = req.params;
    if (!id)
        return res
            .json({ message: 'id pill empty' })
            .status(400);

    const result = await verifyUser(req, res, id, Pills);
    if (!result) return res.json({ message: 'Unexpected error' }).status(403);

    try {
        const pill = await Pills.findOne({ _id: id });
        if (!pill)
            return res
                .json({ message: 'Pastilla no encontrada' })
                .status(404);
        return res.json({ done: true, results: pill });
    }
    catch (err) {
        throw new Error(`Error finding id / ${err}`)
    }

}

exports.deletePill = async (req, res) => {
    const { id } = req.params;
    console.log(verifyUser(req, id, Pills));
    const result = await verifyUser(req, id, Pills);
    if (!result) return res.json({ message: 'Unexpected error' }).status(403);

    try {
        await Pills.deleteOne({ _id: id });
        return res.json({ message: 'pastilla eliminada', done: true });
    }
    catch (err) {
        throw new Error(`Error borrando la pastilla: ${err}`)
    }

}

exports.editPill = async (req, res) => {
    const { id } = req.params;
    const { pillName, repeat, pillHour, amount } = req.body;

    const result = await verifyUser(req, id, Pills);
    if (!result) return res.json({ message: 'Unexpected error' }).status(403);

    try {
        const oldPill = await Pills.findOne({_id: id});
        console.log(oldPill);
        await Pills.updateOne({ _id: id },
            { 
                pillName: pillName ? pillName : oldPill.pillName, 
                repeat: repeat ? repeat : oldPill.repeat, 
                pillHour: pillHour  ? pillHour : oldPill.pillHour, 
                amount: amount ? amount : oldPill.amount});

        return res.json({ message: 'pill updated', done: true });

    } catch (err) {
        throw new Error(`Error updating the pill: ${err}`)
    }


}