const jwt = require('jsonwebtoken');
const Users = require('../models/users');
function userMustBeLogged (req, res, next) {
    const token = req.headers['x-access-token'];
    
    if (!token) {
        return res
            .json({message: 'the user must be logged'})
            .status(401);
    }
    req.userId = jwt.verify(token, process.env.SECRET);

    next();
}

function userAlreadyLogged (req, res, next) {
    const token = req.headers['x-access-token'];

    if (token) {
        return res
            .json({message: 'user already logged'})
            .status(401);
    }

    next();
}

module.exports = {userMustBeLogged, userAlreadyLogged};