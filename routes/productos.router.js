const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProdustos, obtenerProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos.cotroller');
const { existeProductoPorId } = require('../helpers/db-validators');
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

router.put('/:id',[
    check('id', 'El id del producto no es valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarJWT,
    validarCampos
],actualizarProducto);

// Borrar producto -privado - solo userRole ADMIN
router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarJWT,
    isAdminRole,
    validarCampos
],eliminarProducto); 

module.exports = router;
