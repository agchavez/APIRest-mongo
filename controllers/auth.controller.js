const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require("../models/usuario");
const { generateJWT } = require("../helpers/generateJWT");

const login = async(req = request, res = response)=>{

    const {correo, password} = req.body;
    try {
        //Verificar si el email existe 
        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg:"El correo electronico no existe"
            })
        }

        //Si el usuario esta activo 
        // if(!usuario.estado){
        //     return res.status(400).json({
        //         msg:"El estado ya se encuentra activo"
        //     })
        // }
        //Veificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg:"La contraseña es incorrecta"
            })
        }

        //Generar el JWT
        const token = await generateJWT(usuario.id);
        res.json({
            msg: 'Login ok',
            token
    
        })
        
    } catch (error) {
        return res.status(500).json({
            msg:"Error al verificar"
        })
        
    }

   
}

module.exports = {
    login
}