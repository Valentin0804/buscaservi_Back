const express = require('express');
const app = express();
require('dotenv').config();
const connection = require('./config/database')
const { getConnection } = require('./config/database');


// Middleware y rutas
app.use(express.json());
app.use('/api/users', require('./routes/entityRoutes'));

(async () => {
  try {
    await getConnection();
    console.log('Conexión a la base de datos exitosa.');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
    process.exit(1); // Salir del proceso si no se puede conectar a la base de datos
  }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
