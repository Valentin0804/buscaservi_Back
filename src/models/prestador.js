const connection = require('../config/database');

// Crear un nuevo prestador
const createPrestador = async (prestador) => {
    const { name, mail, password, birthdate, phone, address, service} = prestador;
    const query = 'INSERT INTO prestadores (name, mail, password, birthdate, phone, address, service) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [name, mail, password, birthdate, phone, address, service];
    
    try {
        const [results] = await connection.execute(query, values);
        return results;
    } catch (err) {
        console.error('Error creating prestador:', err); // Log the error
        throw err;
    }
};

// Obtener todos los prestadores
const getAllPrestadores = async () => {
    const query = 'SELECT * FROM prestadores';
    
    try {
        const [results] = await connection.execute(query);
        return results;
    } catch (err) {
        console.error('Error fetching prestadores:', err); // Log the error
        throw err;
    }
};

// Obtener un prestador por su ID
const getPrestadorById = async (id) => {
    const query = 'SELECT * FROM prestadores WHERE id = ?';
    
    try {
        const [results] = await connection.execute(query, [id]);
        return results[0];
    } catch (err) {
        console.error('Error fetching prestador by ID:', err); // Log the error
        throw err;
    }
};

// Obtener prestadores por servicio
const getPrestadoresByService = async (service) => {
    const query = 'SELECT * FROM prestadores WHERE service = ?'; // Asegúrate de que la columna de la base de datos se llama "service"
    
    try {
        const [results] = await connection.execute(query, [service]);
        return results;
    } catch (err) {
        console.error('Error fetching prestadores by service:', err);
        throw err;
    }
};

// Actualizar un prestador por su ID
const updatePrestador = async (id, user) => {
    const { name, mail, password, birthdate, phone, address, service } = prestador;
    const query = 'UPDATE prestadores SET name = ?, mail = ?, password = ?, birthdate = ?, phone = ?, address = ? service = ? WHERE id = ?';
    const values = [name, mail, password, birthdate, phone, address, id];
    
    try {
        const [results] = await connection.execute(query, values);
        return results;
    } catch (err) {
        console.error('Error updating prestador:', err); // Log the error
        throw err;
    }
};

// Eliminar un prestador por su ID
const deletePrestador = async (id) => {
    const query = 'DELETE FROM prestadores WHERE id = ?';
    
    try {
        const [results] = await connection.execute(query, [id]);
        return results;
    } catch (err) {
        console.error('Error deleting prestador:', err); // Log the error
        throw err;
    }
};

module.exports = {
    createPrestador,
    getAllPrestadores,
    getPrestadorById,
    updatePrestador,
    deletePrestador,
    getPrestadoresByService
};
