const connection = require('../config/database');

// Crear un nuevo servicio
const createService = async (service) => {
    const { name, description } = service;
    const query = 'INSERT INTO services (name, description) VALUES (?, ?)';
    const values = [name, description];
    
    try {
        const [results] = await connection.execute(query, values);
        return results;
    } catch (err) {
        console.error('Error creating service:', err);
        throw err;
    }
};

// Obtener todos los servicios
const getAllServices = async () => {
    const query = 'SELECT * FROM services';
    
    try {
        const [results] = await connection.execute(query);
        return results;
    } catch (err) {
        console.error('Error fetching services:', err);
        throw err;
    }
};

// Obtener un servicio por su ID
const getServiceById = async (id) => {
    const query = 'SELECT * FROM services WHERE id = ?';
    
    try {
        const [results] = await connection.execute(query, [id]);
        return results[0];
    } catch (err) {
        console.error('Error fetching service by ID:', err);
        throw err;
    }
};

// Actualizar un servicio por su ID
const updateService = async (id, service) => {
    const { name, description } = service;
    const query = 'UPDATE services SET name = ?, description = ? WHERE id = ?';
    const values = [name, description, id];
    
    try {
        const [results] = await connection.execute(query, values);
        return results;
    } catch (err) {
        console.error('Error updating service:', err);
        throw err;
    }
};

// Eliminar un servicio por su ID
const deleteService = async (id) => {
    const query = 'DELETE FROM services WHERE id = ?';
    
    try {
        const [results] = await connection.execute(query, [id]);
        return results;
    } catch (err) {
        console.error('Error deleting service:', err);
        throw err;
    }
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
};