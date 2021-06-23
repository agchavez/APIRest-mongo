const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProdustos, obtenerProducto } = require('../controllers/productos.cotroller');
const { validarJWT, isAdminRole } = require('../middlewares');


const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();
/*

{{url}}/api/categorias
*/
// Obtener todas las categorias - publico
router.post('/',[
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('categoria', 'El id de la categoria es obligatorio').notEmpty(),
    check('categoria', 'El id de la categoria no es valido').isMongoId(),
    validarJWT,
    validarCampos
], crearProducto)

router.get('/', obtenerProdustos);

router.get('/:id',[
    check('id','El id del producto no es valido').isMongoId()
], obtenerProducto);

module.exports = router;
