const express = require('express');
const router = express.Router();
const pool = require('../config/database'); // Ajustar la ruta

// Ruta para obtener todas las entidades
router.get('/entities', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM entities');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para obtener una entidad por ID
router.get('/entities/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM entities WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Entity not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Añade más rutas según tus necesidades (crear, actualizar, eliminar, etc.)

module.exports = router;
