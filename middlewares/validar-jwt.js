const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next)=>{
    const token = req.header('x-token');
    console.log(token);
    if (!token) {
        return res.status(401).json({
            msg:"No hay token en la peticion"
        });
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //Sobre escribir la request
        req.uid = uid;
        //Obtener el usario autenticado 
        usuario =  await Usuario.findById(uid);
        console.log(usuario);

        //Si el usuario no existe 
        if(!usuario){
            return res.status(401).json({
                msg:"Token no valido - El usuario no existe"
            });
        }

         //Verificar si el usario esta eliminado
         if(!usuario.estado){
             return res.status(401).json({
                 msg:"Token no valido - Usuario eliminado"
             })
         }
         req.usuario = usuario;

        //Si el token es valido se ejecuta la funcion 
        next();
    } catch (error) {
        return res.status(401).json({
            msg:"Token no valido"
        });
    }

}


module.exports = {
    validarJWT
}