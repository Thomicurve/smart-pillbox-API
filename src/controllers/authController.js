const jwt = require('jsonwebtoken');
const Users = require('../models/users');


exports.login = async (req, res) => {
    const { dni } = req.body;
    
    const resultUser = await Users.findOne({dni: dni}, (err) => {
        return err;
    });

    if(!resultUser)
        return res
            .json({done: false, message:'Usuario no encontrado'})
            .status(404);

    // Create token with user id
    const token = jwt.sign(resultUser._id.toString(), process.env.SECRET);
    return res
        .json({token: token, message: 'Inicio sesíon exitoso!'})
        .status(200);
}

exports.register = async (req, res) => {
    const { dni, name } = req.body;
    const verifyUser = await Users.findOne({dni: dni});

    if(verifyUser)
        return res
            .json({message: 'El usuario ya está registrado'})
            .status(400); 

    if(!dni || !name)
        return res
            .json({message: 'Complete el formulario', done: false})
            .status(400);

    // Create a new document in Users
    const user = new Users({
        dni,
        name,
    })
    await user.save();

    return res
        .json({message: 'Usuario registrado correctamente!'})
        .status(200);
}