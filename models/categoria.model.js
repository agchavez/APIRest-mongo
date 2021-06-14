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
    }
});


module.exports = model( 'Categoria', CategoriaSchema );