const express = require('express');
const app = express();
require('dotenv').config();
const connection = require('./src/config/database')

// Middleware y rutas
app.use(express.json());
app.use('/api/users', require('./src/routes/entityRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
