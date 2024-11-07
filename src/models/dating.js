// Citas
const connection = require('../config/database');

const createDating = async (dating) => {
    const { date, hour, idServiceRequest, idBudget} = dating;
    const query = 'INSERT INTO dating ( date, hour, idServiceRequest, idBudget) VALUES (?, ?, ?, ?)';
    const values = [ date, hour, idServiceRequest, idBudget];
    
    try {
        const [results] = await connection.execute(query, values);
        return results;
    } catch (err) {
        console.error('Error creating budget:', err); // Log the error
        throw err;
    }
};

// Obtener un presupuesto por su ID
const getDatingById = async (id) => {
    const query = 'SELECT * FROM dating WHERE id = ?';
    
    try {
        const [results] = await connection.execute(query, [id]);
        return results[0];
    } catch (err) {
        console.error('Error fetching dating by ID:', err); // Log the error
        throw err;
    }
};


const updateDating = async (id, user) => {
    const {  date, hour, idServiceRequest, idBudget } = dating;
    const query = 'UPDATE dating SET date = ?, hour = ?, status = ?, idServiceRequest = ?, idBudget = ? WHERE id = ?';
    const values = [  date, hour, idServiceRequest, idBudget, id];
    
    try {
        const [results] = await connection.execute(query, values);
        return results;
    } catch (err) {
        console.error('Error updating dating:', err); // Log the error
        throw err;
    }
};

// Eliminar un prestador por su ID
const deleteDating = async (id) => {
    const query = 'DELETE FROM dating WHERE id = ?';
    
    try {
        const [results] = await connection.execute(query, [id]);
        return results;
    } catch (err) {
        console.error('Error deleting dating:', err); // Log the error
        throw err;
    }
};

module.exports = {
    createDating,
    getDatingById,
    updateDating,
    deleteDating,
};
