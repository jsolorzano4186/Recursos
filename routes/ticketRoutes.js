const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// GET /tickets - Listar todos los tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener tickets', error: error.message });
    }
});

// GET /tickets/:id - Obtener un ticket por ID
router.get('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ mensaje: 'Ticket no encontrado' });
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el ticket', error: error.message });
    }
});

// POST /tickets - Crear un ticket
router.post('/', async (req, res) => {
    try {
        const nuevoTicket = new Ticket(req.body);
        const ticketGuardado = await nuevoTicket.save();
        res.status(201).json(ticketGuardado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear ticket', error: error.message });
    }
});

// PUT /tickets/:id - Actualizar estado o detalles
router.put('/:id', async (req, res) => {
    try {
        const ticketActualizado = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!ticketActualizado) return res.status(404).json({ mensaje: 'Ticket no encontrado' });
        res.status(200).json(ticketActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar ticket', error: error.message });
    }
});

// DELETE /tickets/:id - Eliminar un ticket
router.delete('/:id', async (req, res) => {
    try {
        const ticketEliminado = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticketEliminado) return res.status(404).json({ mensaje: 'Ticket no encontrado' });
        res.status(200).json({ mensaje: 'Ticket eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar ticket', error: error.message });
    }
});

module.exports = router;