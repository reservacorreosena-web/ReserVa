const mongoose = require('mongoose');

// Definición del esquema para el modelo Reseña

const resenaSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', // Esto es como el foreing key de django
        required: [true, 'La reseña debe pertenecer a un usuario']
    },
    calificacion_comida: {
        type: Number,
        required: [true, 'La calificación de la comida es obligatoria'],
        min: [1, 'La calificación mínima es 1'],
        max: [5, 'La calificación máxima es 5']
    },
    calificacion_servicio: {
        type: Number,
        required: [true, 'La calificación del servicio es obligatoria'],
        min: [1, 'La calificación mínima es 1'],
        max: [5, 'La calificación máxima es 5']
    },
    comentario: {
        type: String,
        trim: true,
        maxlength: [500, 'El comentario no puede superar los 500 caracteres']
    }
}, {
    timestamps: true // Reemplaza a fecha = models.DateTimeField(auto_now_add=True)

});

resenaSchema.methods.obtenerResumen = function() {
  return `Reseña - Comida: ${this.calificacion_comida} | Servicio: ${this.calificacion_servicio}`;
};

module.exports = mongoose.model('Resena', resenaSchema);