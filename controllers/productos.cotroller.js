const { response } = require("express");
const { Producto, Categoria } = require("../models/index.model");





const crearProducto = async( req = require,res = response)=>{
        const {nombre, precio, categoria, descripcion} = req.body;
        const categroriaDB = await Categoria.findById(categoria);

        if(categroriaDB === null){
            res.status(401).json({
                    msg:"La categoria no existe"
            })
        }
        try {
                const data = {
                nombre,
                precio,
                categoria,
                usuario: req.usuario._id,
                descripcion
            }
            const productoDb = new Producto(data);
            await productoDb.save()
            res.json(data)
        } catch (error) {
            res.status(400).json({
                msg:"error al obtener productos",
                error
            })
            
        }
}

const obtenerProdustos = async(req = require, res= response)=>{
    const { limite = 5, desde = 0 } = req.query;
    console.log(desde);
    try {
        const query = { estado: true };
        const [productos, total] = await Promise.all([
                            Producto.find(query)
                                    .populate('categoria')
                                    .skip( Number( desde ) )
                                    .limit(Number( limite )),
                            Producto.countDocuments(query)
                            ]);

        res.json({
            productos,
            total
        })
        
    } catch (error) {
        res.status(400).json({
            msg:"error al obtener categorias",
            error
        })
    }
}

const obtenerProducto = async (req= request, res=response)=>{
    const {id} = req.params;

    try {
        const producto = await Producto.findById(id)
                                .populate('categoria');

        res.json(producto)
        
    } catch (error) {
        res.status(400).json({
            msg:"error",
            error
        })
    }

}


module.exports = {
    crearProducto,
    obtenerProdustos,
    obtenerProducto
}