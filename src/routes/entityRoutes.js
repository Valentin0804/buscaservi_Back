const express = require('express');
const app = express.Router();
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../models/user');
const { getAllPrestadores, getPrestadorById, createPrestador, updatePrestador } = require('../models/prestador');
const { createServiceRequest,getAllserviceRequests, getserviceRequestById, updateserviceRequest, deleteserviceRequest } = require('../models/serviceRequest');

// Obtener todos los usuarios
app.get('/', (req, res) => {
    res.send('peticion get');
});

// Obtener un usuario por su ID
app.get('/:id', async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear un nuevo usuario
app.post('/', async (req, res) => {
    const newUser = req.body;
    try {
        const results = await createUser(newUser);
        res.status(201).json({ id: results.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Actualizar un usuario por su ID
app.put('/:id', async (req, res) => {
    const user = req.body;
    try {
        const results = await updateUser(req.params.id, user);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Eliminar un usuario por su ID
app.delete('/:id', async (req, res) => {
    try {
        const results = await deleteUser(req.params.id);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener todos los Prestadores
app.get('/', async (req, res) => {
    try {
        const Prestadores = await getAllPrestadores();
        res.json(Prestadores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener un Prestador por su ID
app.get('/:id', async (req, res) => {
    try {
        const Prestador = await getPrestadorById(req.params.id);
        if (!Prestador) {
            return res.status(404).json({ error: 'Prestador not found' });
        }
        res.json(Prestador);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear un nuevo Prestador
app.post('/', async (req, res) => {
    const newPrestador = req.body;
    try {
        const results = await createPrestador(newPrestador);
        res.status(201).json({ id: results.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar un Prestador por su ID
app.put('/:id', async (req, res) => {
    const Prestador = req.body;
    try {
        const results = await updatePrestador(req.params.id, Prestador);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Prestador not found' });
        }
        res.json({ message: 'Prestador updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Eliminar un Prestador por su ID
app.delete('/:id', async (req, res) => {
    try {
        const results = await deletePrestador(req.params.id);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Prestador not found' });
        }
        res.json({ message: 'Prestador deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener todas las solicitudes de servicio
app.get('/', async (req, res) => {
    try {
        const serviceRequest = await getAllserviceRequests();
        res.json(serviceRequest);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener una solicitud de servicio por su ID
app.get('/:id', async (req, res) => {
    try {
        const serviceRequest = await getserviceRequestById(req.params.id);
        if (!serviceRequest) {
            return res.status(404).json({ error: 'service request not found' });
        }
        res.json(serviceRequest);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear una nueva solicitud de servicio
app.post('/', async (req, res) => {
    const newServiceRequest = req.body;
    try {
        const results = await createServiceRequest(newServiceRequest);
        res.status(201).json({ id: results.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar una solicitud de servicio por su ID
app.put('/:id', async (req, res) => {
    const serviceRequest = req.body;
    try {
        const results = await updateserviceRequest(req.params.id, user);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Service request not found' });
        }
        res.json({ message: 'Service request updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Eliminar una solicitud de servicio por su ID
app.delete('/:id', async (req, res) => {
    try {
        const results = await deleteserviceRequest(req.params.id);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Service Request not found' });
        }
        res.json({ message: 'Service Request deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = app;
