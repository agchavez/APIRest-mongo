const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias.controller');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, isAdminRole } = require('../middlewares');


const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();
/*

{{url}}/api/categorias
*/
// Obtener todas las categorias - publico

router.get('/', obtenerCategorias);

//Obtener una categoria por id - publico
router.get('/:id',[ 
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeCategoriaPorId ),
        validarCampos
    ], obtenerCategoria);

//Crear categroria - privada - cualquier persona con un token valido

router.post('/', [
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        validarJWT,
        validarCampos
    ]
    , crearCategoria
);

// Actualizar - privado - cualquiera con un token valido
router.put('/:id',[
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeCategoriaPorId ),
        check('nombre','el nombre es obligatorio').notEmpty(),
        validarJWT,
        validarCampos
],actualizarCategoria
);

// Borrar categoria -privado - solo userRole ADMIN
router.delete('/:id',[
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeCategoriaPorId ),
        validarJWT,
        isAdminRole,
        validarCampos
],eliminarCategoria); 


module.exports = router