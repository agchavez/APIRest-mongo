const { response } = require("express");


const isAdminRole = (req = Request, res = response, next)=>{
    if(!req.usuario){
        return res.status(500).json({
            msg:"Se quiere verificar el rol sin verificar el token"
        })
    }
    const {rol, nombre}=req.usuario;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:"El usuario no tiene el rol de ADMIN_ROLE"
        })
    }

    next();
}

const tieneRole = (...roles)=>{
    return (req = Request, res = response, next)=>{
        if (!req.usuario) {
            return res.status(500).json({
                msg:"Se quiere verificar el rol sin verificar el token"
            }) 
        }
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg:`El usuario necesita tener uno de los siguientes roles ${roles}`
            })
        }
        next();

    }
}

module.exports = {
    isAdminRole,
    tieneRole
}