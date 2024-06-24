const connection = require('../config/database');

// Crear un nuevo usuario
const createUser = async (user) => {
    const { name, mail, password, birthdate, phone, address } = user;
    const query = 'INSERT INTO users (name, mail, password, birthdate, phone, address) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [name, mail, password, birthdate, phone, address];
    
    try {
        const [results] = await connection.execute(query, values);
        return results;
    } catch (err) {
        console.error('Error creating user:', err); // Log the error
        throw err;
    }
};

// Obtener todos los usuarios
const getAllUsers = async () => {
    const query = 'SELECT * FROM users';
    
    try {
        const [results] = await connection.execute(query);
        return results;
    } catch (err) {
        console.error('Error fetching users:', err); // Log the error
        throw err;
    }
};

// Obtener un usuario por su ID
const getUserById = async (id) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    
    try {
        const [results] = await connection.execute(query, [id]);
        return results[0];
    } catch (err) {
        console.error('Error fetching user by ID:', err); // Log the error
        throw err;
    }
};

// Actualizar un usuario por su ID
const updateUser = async (id, user) => {
    const { name, mail, password, birthdate, phone, address } = user;
    const query = 'UPDATE users SET name = ?, mail = ?, password = ?, birthdate = ?, phone = ?, address = ? WHERE id = ?';
    const values = [name, mail, password, birthdate, phone, address, id];
    
    try {
        const [results] = await connection.execute(query, values);
        return results;
    } catch (err) {
        console.error('Error updating user:', err); // Log the error
        throw err;
    }
};

// Eliminar un usuario por su ID
const deleteUser = async (id) => {
    const query = 'DELETE FROM users WHERE id = ?';
    
    try {
        const [results] = await connection.execute(query, [id]);
        return results;
    } catch (err) {
        console.error('Error deleting user:', err); // Log the error
        throw err;
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
