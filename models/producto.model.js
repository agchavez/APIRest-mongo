const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default:true,
        required: [true, 'El nombre es obligatorio']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: [true, 'El id del usuario es obligatorio']
    },
    precio:{
        type: Number,
        default: 0
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:'Categoria',
        require:  [true, 'El id de la categroaia es obligatorio']
    },
    descripcion:{
        type:String,
    },
    disponible: {
        type:Boolean,
        default:true
    }

});


module.exports = model( 'Producto', CategoriaSchema );