const mongoose = require('mongoose');

// Definición del esquema para el modelo Reseña

const resenaSchema = new mongoose.Schema({
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
});

resenaSchema.methods.obtenerResumen = function() {
  return `Reseña - Comida: ${this.calificacion_comida} | Servicio: ${this.calificacion_servicio}`;
};

module.exports = mongoose.model('Resena', resenaSchema);