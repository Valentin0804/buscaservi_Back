const { Connection } = require('mongoose');
const mysql = require('mysql2/promise');
require('dotenv').config();

// Validar las variables de entorno
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Error: La variable de entorno ${envVar} no está definida.`);
    process.exit(1);
  }
});

// Crear el pool de conexiones
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exportar el pool de conexiones y la función de conexión
module.exports = connection;

module.exports = connection;
