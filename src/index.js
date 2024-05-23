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

// Rutas
const entityRoutes = require('./routes/entityRoutes');
app.use('/api/entities', entityRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
