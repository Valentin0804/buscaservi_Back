require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middlewares
app.use(express.json());

// Configuración de la base de datos
const dbConfig = require('./config/database');
mongoose.connect(dbConfig.url, dbConfig.options)
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error(err));

// Create
app.post('/entities', async (req, res) => {
  try {
    const newEntity = new Entity(req.body);
    await newEntity.save();
    res.status(201).json(newEntity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete
app.delete('/entities/:id', getEntity, async (req, res) => {
  try {
    await res.entity.remove();
    res.json({ message: 'Entity deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getEntity(req, res, next) {
  try {
    const entity = await Entity.findById(req.params.id);
    if (entity == null) {
      return res.status(404).json({ message: 'Entity not found' });
    }
    res.entity = entity;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}


// Rutas
const entityRoutes = require('./routes/entityRoutes');
app.use('/api/entities', entityRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
