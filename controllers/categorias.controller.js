const { request, response } = require("express");
const { Categoria } = require("../models/index.model");


const crearCategoria = async (req = request, res= response)=>{

    const nombre = req.body.nombre.toUpperCase();
    const categroriaDB = await Categoria.findOne({nombre});
    if(categroriaDB){
        return res.status(400).json({
            msg: `La categoria ${nombre}, ya existe`
        })
    }
    try {
            //Generar la data
            const data = {
                nombre,
                usuario: req.usuario._id
            }
            const categoria = new Categoria(data);
            //Guardar en la DB
            await categoria.save();
            res.status(201).json(categoria);
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}
const obtenerCategoria = async (req= request, res=response)=>{
    const {id} = req.params;

    try {
        const categoria = await Categoria.findById(id).populate('usuario');

        res.json(categoria)
        
    } catch (error) {
        res.status(400).json({
            msg:"error",
            error
        })
    }

}

const obtenerCategorias = async(req= request, res=response)=>{
    try {
        const query = { estado: true };
        const categoria = await Promise.all([
                            Categoria.find(query).populate('usuario'),
                            Categoria.countDocuments(query)
                            ])

        res.json(categoria)
        
    } catch (error) {
        res.status(400).json({
            msg:"error al obtener categorias",
            error
        })
    }
}

const actualizarCategoria = async(req=request, res = response) =>{
    const {id} = req.params;
    const nombre = req.body.nombre.toUpperCase();
    const data = {
        nombre
    }
    try {
        const categoria = await Categoria.findByIdAndUpdate(id, data);
        res.status(201).json(categoria);
        
    } catch (error) {
        res.status(500).json({
            msg:"error al actualizar categoria",
            error
        })
    }
}

const eliminarCategoria = async(req=request, res = response)=>{
    const {id} = req.params;
    try {
        const usuario = await Categoria.findByIdAndUpdate( id, { estado: false } );

        res.json(usuario);
        
    } catch (error) {
        res.status(500).json({
            msg:"error al elimiar categoria",
            error
        })
    }
    

}

module.exports ={
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias,
    actualizarCategoria,
    eliminarCategoria
}