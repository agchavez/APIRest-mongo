const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, isAdminRole } = require('../middlewares');


const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();
/*

{{url}}/api/categorias
*/
// Obtener todas las categorias - publico

router.get('/', (req, res)=>{
    res.json({
        "msg":"get"
    })
});

module.exports = router;
