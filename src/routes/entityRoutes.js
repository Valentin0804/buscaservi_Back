const express = require('express');
const router = express.Router();

// Importar los modelos
const {
  createPrestador,
  getAllPrestadores,
  getPrestadorById,
  updatePrestador,
  deletePrestador
} = require('../models/prestador');

const {
  createServiceRequest,
  getAllServiceRequests,
  getServiceRequestById,
  updateServiceRequest,
  deleteServiceRequest
} = require('../models/serviceRequest');

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../models/user');

// Rutas para `prestador`
router.post('/prestadores', async (req, res) => {
  try {
    const id = await createPrestador(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/prestadores', async (req, res) => {
  try {
    const prestadores = await getAllPrestadores();
    res.status(200).json(prestadores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/prestadores/:id', async (req, res) => {
  try {
    const prestador = await getPrestadorById(req.params.id);
    if (prestador) {
      res.status(200).json(prestador);
    } else {
      res.status(404).json({ error: 'Prestador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/prestadores/:id', async (req, res) => {
  try {
    const affectedRows = await updatePrestador(req.params.id, req.body);
    if (affectedRows > 0) {
      res.status(200).json({ message: 'Prestador actualizado' });
    } else {
      res.status(404).json({ error: 'Prestador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/prestadores/:id', async (req, res) => {
  try {
    const affectedRows = await deletePrestador(req.params.id);
    if (affectedRows > 0) {
      res.status(200).json({ message: 'Prestador eliminado' });
    } else {
      res.status(404).json({ error: 'Prestador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rutas para `serviceRequest`
router.post('/service-requests', async (req, res) => {
  try {
    const id = await createServiceRequest(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/service-requests', async (req, res) => {
  try {
    const requests = await getAllServiceRequests();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/service-requests/:id', async (req, res) => {
  try {
    const request = await getServiceRequestById(req.params.id);
    if (request) {
      res.status(200).json(request);
    } else {
      res.status(404).json({ error: 'Solicitud de servicio no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/service-requests/:id', async (req, res) => {
  try {
    const affectedRows = await updateServiceRequest(req.params.id, req.body);
    if (affectedRows > 0) {
      res.status(200).json({ message: 'Solicitud de servicio actualizada' });
    } else {
      res.status(404).json({ error: 'Solicitud de servicio no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/service-requests/:id', async (req, res) => {
  try {
    const affectedRows = await deleteServiceRequest(req.params.id);
    if (affectedRows > 0) {
      res.status(200).json({ message: 'Solicitud de servicio eliminada' });
    } else {
      res.status(404).json({ error: 'Solicitud de servicio no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rutas para `user`
router.post('/users', async (req, res) => {
  try {
    const id = await createUser(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const affectedRows = await updateUser(req.params.id, req.body);
    if (affectedRows > 0) {
      res.status(200).json({ message: 'Usuario actualizado' });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const affectedRows = await deleteUser(req.params.id);
    if (affectedRows > 0) {
      res.status(200).json({ message: 'Usuario eliminado' });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
