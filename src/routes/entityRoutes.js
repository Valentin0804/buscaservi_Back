const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../models/user');
const { getAllPrestadores, getPrestadorById, createPrestador, updatePrestador } = require('../models/prestador');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener un usuario por su ID
router.get('/:id', async (req, res) => {
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
router.post('/', async (req, res) => {
    const newUser = req.body;
    try {
        const results = await createUser(newUser);
        res.status(201).json({ id: results.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar un usuario por su ID
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

// Obtener todos los prestadores
router.get('/', async (req, res) => {
    try {
        const prestadores = await getAllPrestadores();
        res.json(prestadores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener un prestador por su ID
router.get('/:id', async (req, res) => {
    try {
        const prestador = await getPrestadorById(req.params.id);
        if (!prestador) {
            return res.status(404).json({ error: 'Prestador not found' });
        }
        res.json(prestador);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear un nuevo prestador
router.post('/', async (req, res) => {
    const newPrestador = req.body;
    try {
        const results = await createPrestador(newPrestador);
        res.status(201).json({ id: results.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar un prestador por su ID
router.put('/:id', async (req, res) => {
    const prestador = req.body;
    try {
        const results = await updatePrestador(req.params.id, prestador);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Prestador not found' });
        }
        res.json({ message: 'Prestador updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Eliminar un prestador por su ID
router.delete('/:id', async (req, res) => {
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

module.exports = router;
