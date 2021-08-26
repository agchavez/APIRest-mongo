const { Categoria, Producto } = require('../models/index.model');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeCategoriaPorId = async (id) =>{
    //Verificar si existe categoria
    const existeCategoria = await Categoria.findById(id)
    if(!existeCategoria){
        throw new Error(`la Categoria con el id ${id}, no existe`)
    }
}

const existeProductoPorId = async (id)=>{
    //Verificar si existe producto
    const existeCategoria = await Producto.findById(id)
    if(!existeCategoria){
        throw new Error(`El Producto con el id ${id}, no existe`)
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}

