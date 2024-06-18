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
app.post('/user', async (req, res) => {
  try {
    const newUser = new user(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete
app.delete('/user/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'user deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.user = user;
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
