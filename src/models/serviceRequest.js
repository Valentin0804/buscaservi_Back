const connection = require('../config/database');

// Crear una nueva solicitud de servicio
const createServiceRequest = async (serviceRequest) => {
    const { date, hour, description, state, idService, idPrestador,idUser } = serviceRequest;
    const query = 'INSERT INTO serviceRequests (date, hour, description, state, idService, idPrestador,idUser) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [date, hour, description, state, idService, idPrestador,idUser];
    
    try {
        const [results] = await connection.execute(query, values);
        return results;
    } catch (err) {
        console.error('Error creating serviceRequest:', err); // Log the error
        throw err;
    }
};

// Obtener todas las solicitudes de servicios
const getAllserviceRequests = async () => {
    const query = 'SELECT * FROM serviceRequests';
    
    try {
        const [results] = await connection.execute(query);
        return results;
    } catch (err) {
        console.error('Error fetching serviceRequests:', err); // Log the error
        throw err;
    }
};

// Obtener una solicitud de servicio por su ID
const getserviceRequestById = async (id) => {
    const query = 'SELECT * FROM serviceRequests WHERE id = ?';
    
    try {
        const [results] = await connection.execute(query, [id]);
        return results[0];
    } catch (err) {
        console.error('Error fetching serviceRequest by ID:', err); // Log the error
        throw err;
    }
};

// Actualizar una solicitud de servicio por su ID
const updateserviceRequest = async (id, serviceRequest) => {
    const { date, hour, description, state, idService, idPrestador, idUser } = serviceRequest;
    const query = 'UPDATE serviceRequests SET date = ?, hour = ?, description = ?, state = ?, idService = ?, idPrestador = ?, idUser = ? WHERE id = ?';
    const values = [date, hour, description, state, idService, idPrestador, idUser, id];
    
    try {
        const [results] = await connection.execute(query, values);
        return results;
    } catch (err) {
        console.error('Error updating serviceRequest:', err); // Log the error
        throw err;
    }
};

// Eliminar una solicitud de servicio por su ID
const deleteserviceRequest = async (id) => {
    const query = 'DELETE FROM serviceRequests WHERE id = ?';
    
    try {
        const [results] = await connection.execute(query, [id]);
        return results;
    } catch (err) {
        console.error('Error deleting serviceRequest:', err); // Log the error
        throw err;
    }
};

module.exports = {
    createServiceRequest,
    getAllserviceRequests,
    getserviceRequestById,
    updateserviceRequest,
    deleteserviceRequest
};