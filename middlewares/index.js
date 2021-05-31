const validarJWT  = require('../middlewares/validar-jwt');
const validarCampos  = require('../middlewares/validar-campos');
const  tieneRole  = require('../middlewares/validar-role');

module.exports ={

    ...validarJWT,
    ...validarCampos,
    ...tieneRole

}