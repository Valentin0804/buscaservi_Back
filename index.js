const express = require('express');
const app = express();
require('dotenv').config();
const pool = require('./src/config/database'); // Ajustar la ruta
const entityRoutes = require('./src/routes/entityRoutes'); // Ajustar la ruta

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Verificar conexión a la base de datos
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conectado a la base de datos');
    connection.release();
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
  }
})();

// Utiliza las rutas de entidad
app.use('/api', entityRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
