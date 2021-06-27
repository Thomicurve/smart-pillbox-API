const jwt = require('jsonwebtoken');
const Users = require('../models/users');

exports.login = async (req, res) => {
    const { dni } = req.body;
    const result = await Users.findOne({dni: dni}, (err) => {
        return err;
    });

    if(!result)
        return res
        .json({done: false, message:'User not found'})
        .status(200);
    
    const token = jwt.sign(result.dni, process.env.SECRET);
    return res
    .json({result: result.dni, token: token})
    .status(200);
}

exports.register = async (req, res) => {
    const { dni, name, age } = req.body;
    const verifyUser = await Users.findOne({dni: dni});

    if(verifyUser)
        return res
        .json({message: 'User already register', done: false})
        .status(304); 

    if(!dni || !name)
        return res
        .json({message: 'Data empty', done: false})
        .status(404);

    const user = new Users({
        dni,
        name,
        age
    })
    
    const result = await user.save();
    console.log(result);

    return res
    .json({done: true})
    .status(200);
}