
async function verifyIdentity ({req, id, model}) {
    const result = await model.findOne({_id: id, idUser: req.userId});
    if(!result) return false;
    else return true;
}

module.exports = {verifyIdentity};