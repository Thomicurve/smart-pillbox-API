const jwt = require('jsonwebtoken');
const Users = require('../models/users');

exports.login = async (req, res) => {
    const { dni } = req.body;
    const resultUser = await Users.findOne({dni: dni}, (err) => {
        return err;
    });

    if(!resultUser)
        return res
            .json({done: false, message:'User not found'})
            .status(404);

    // Create token with user dni
    const token = jwt.sign(resultUser.dni, process.env.SECRET);
    return res
        .json({result: resultUser.dni, token: token})
        .status(200);
}

exports.register = async (req, res) => {
    const { dni, name, age } = req.body;
    const verifyUser = await Users.findOne({dni: dni});

    if(verifyUser)
        return res
            .json({message: 'User already register', done: false})
            .status(400); 

    if(!dni || !name)
        return res
            .json({message: 'Data empty', done: false})
            .status(400);

    // Create a new document in Users
    const user = new Users({
        dni,
        name,
        age
    })
    
    await user.save();

    return res
        .json({done: true})
        .status(200);
}