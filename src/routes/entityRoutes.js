const express = require('express');
const router = express.Router();

// Importar los modelos
const {
  createPrestador,
  getAllPrestadores,
  getPrestadorById,
  updatePrestador,
  deletePrestador,
  getPrestadoresByService
} = require('../models/prestador');

const {
  createServiceRequest,
  getAllServiceRequests,
  getServiceRequestById,
  updateServiceRequest,
  deleteServiceRequest
} = require('../models/serviceRequest');

const {
  createBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
  getBudgetsByPrestador
} = require('../models/budgets');

const {
  createDating,
  getDatingById,
  updateDating,
  deleteDating
} = require('../models/dating')

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../models/user');

const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} = require('../models/service');

const{authenticateUser}= require('../models/auth');

//----------------------------------------------------------------------------------------------------------//
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

// Ruta para obtener prestadores por servicio
router.get('/prestadores/:service', async (req, res) => {
  try {
    const prestadores = await getPrestadoresByService(req.params.service); // Llama a la función para obtener prestadores filtrados
    if (prestadores.length > 0) {
      res.status(200).json(prestadores); // Devuelve los prestadores encontrados
    } else {
      res.status(404).json({ error: 'No se encontraron prestadores para este servicio' });
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

//----------------------------------------------------------------------------------------------------------//
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

//----------------------------------------------------------------------------------------------------------//
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

//----------------------------------------------------------------------------------------------------------//
// Rutas para 'Budgets'
router.post('/budget', async (req, res) => {
  try {
    const id = await createBudgets(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/budget/:id', async (req, res) => {
  try {
    const user = await getBudgetById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Presupuesto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/budget/:id', async (req, res) => {
  try {
    const affectedRows = await updateBudget(req.params.id, req.body);
    if (affectedRows > 0) {
      res.status(200).json({ message: 'Presupuesto actualizado' });
    } else {
      res.status(404).json({ error: 'Presupuesto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/budget/:id', async (req, res) => {
  try {
    const affectedRows = await deleteBudget(req.params.id);
    if (affectedRows > 0) {
      res.status(200).json({ message: 'Presupuesto eliminado' });
    } else {
      res.status(404).json({ error: 'Presupuesto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/budget/:prestador', async (req, res) => {
  try {
    const budgets = await getBudgetsByPrestador(req.params.prestador); // Llama a la función para obtener prestadores filtrados
    if (budgets.length > 0) {
      res.status(200).json(budgets); // Devuelve los prestadores encontrados
    } else {
      res.status(404).json({ error: 'No se encontraron Presupuestos para este prestador' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//----------------------------------------------------------------------------------------------------------//
// Rutas para 'Dating'
router.post('/dating', async (req, res) => {
  try {
    const id = await createDating(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/dating/:id', async (req, res) => {
  try {
    const user = await getDatingById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Cita no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/dating/:id', async (req, res) => {
  try {
    const affectedRows = await updateDating(req.params.id, req.body);
    if (affectedRows > 0) {
      res.status(200).json({ message: 'Cita actualizada' });
    } else {
      res.status(404).json({ error: 'Cita no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/dating/:id', async (req, res) => {
  try {
    const affectedRows = await deleteDating(req.params.id);
    if (affectedRows > 0) {
      res.status(200).json({ message: 'Cita eliminada' });
    } else {
      res.status(404).json({ error: 'Cita no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//
// Ruta para el login
router.post('/login', async (req, res) => {
  const { mail, password } = req.body;

  if (!mail || !password) {
    return res.status(400).json({ message: 'Se requieren el correo y la contraseña' });
  }

  try {
    console.log('Intentando iniciar sesión con:', mail);

    // Lógica de autenticación reutilizada
    const user = await authenticateUser(mail, password);

    if (!user) {
      console.log('Credenciales inválidas');
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Retornar una respuesta exitosa
    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
});
//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//
// Rutas para `services`
router.post('/services', async (req, res) => {
  try {
    const id = await createService(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/services', async (req, res) => {
  try {
    const services = await getAllServices();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/services/:id', async (req, res) => {
  try {
    const service = await getServiceById(req.params.id);
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ error: 'Servicio no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/services/:id', async (req, res) => {
  try {
    const affectedRows = await updateService(req.params.id, req.body);
    if (affectedRows > 0) {
      res.status(200).json({ message: 'Servicio actualizado' });
    } else {
      res.status(404).json({ error: 'Servicio no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/services/:id', async (req, res) => {
  try {
    const affectedRows = await deleteService(req.params.id);
    if (affectedRows > 0) {
      res.status(200).json({ message: 'Servicio eliminado' });
    } else {
      res.status(404).json({ error: 'Servicio no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------//

module.exports = router;