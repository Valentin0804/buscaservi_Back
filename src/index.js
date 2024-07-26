const express = require('express');
const app = express();
const entityRoutes = require('./routes/entityRoutes'); // Ajusta la ruta según tu estructura

app.use(express.json()); // Para manejar JSON en las solicitudes
app.use('/api', entityRoutes); // Manejo de rutas con el prefijo /api

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


