const { response, request } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require("../models/usuario");
const { generateJWT } = require("../helpers/generateJWT");
const { verify } = require("../helpers/google-verify");
const usuario = require("../models/usuario");

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

const googleSingIn = async (req= request, res = response)=>{
    const {id_token} = req.body;
    try {
        const {correo, nombre, img} = await verify(id_token);
        let usuario = await Usuario.findOne({correo})
        if(!usuario){
            const data = {
                nombre, 
                correo,
                password: ':)',
                img,
                google:true
            }
            usuario = new Usuario(data)
            await usuario.save()
        }
        //Si el uaurio en la DB
        if(!usuario.estado){
            res.status(401).json({
                msg:'Hable con el administrador, usuario bloqueado'
            })
        }

        //Generar el JWT
        const token = await generateJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        res.status(400).json({
            msg: "Token de Google no es valido",
        })
    }
}

module.exports = {
    login,
    googleSingIn
}