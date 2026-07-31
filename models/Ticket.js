const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    categoria: {
        type: String,
        required: true,
        enum: ['Red', 'Hardware', 'Software']
    },
    prioridad: {
        type: String,
        required: true,
        enum: ['Alta', 'Media', 'Baja'],
        default: 'Media'
    },
    estado: {
        type: String,
        required: true,
        enum: ['Abierto', 'En Progreso', 'Cerrado'],
        default: 'Abierto'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Ticket', ticketSchema);