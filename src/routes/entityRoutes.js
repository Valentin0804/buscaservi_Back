const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../models/user');

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

module.exports = router;
