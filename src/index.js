// index.js
const cors = require('cors'); // Importa cors
const express = require('express');
require('dotenv').config(); // Cargar variables de entorno
const connection = require('./config/database'); // Conexión a la base de datos
const entityRoutes = require('./routes/entityRoutes'); // Importar rutas

const app = express();
app.use(cors());
app.use(express.json()); // Para manejar JSON en las solicitudes

// Manejo de rutas
app.use('/api', entityRoutes); // Prefijo para las rutas de la entidad

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).send({ message: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});


