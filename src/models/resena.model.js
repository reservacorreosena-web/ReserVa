const mongoose = require('mongoose');

// Definición del esquema para el modelo Reseña

const resenaSchema = new mongoose.Schema({
<<<<<<< HEAD:src/models/resena.js
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  calificacion_comida: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  calificacion_servicio: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comentario: {
    type: String,
    maxlength: 500,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true 
=======
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
>>>>>>> 0731950eb5381808842684aa4916c28912746b6e:src/models/resena.model.js
});

resenaSchema.methods.obtenerResumen = function() {
  return `Reseña - Comida: ${this.calificacion_comida} | Servicio: ${this.calificacion_servicio}`;
};

module.exports = mongoose.model('Resena', resenaSchema);