// Presupuestos
const connection = require('../config/database');

const createBudgets = async (budget) => {
    const {amount, description, status, idPrestador, idServiceRequest} = budget;
    const query = 'INSERT INTO budget (amount, description, status, idPrestador, idServiceRequest) VALUES ( ?, ?, ?, ?, ?, ?)';
    const values = [ amount, description, status, idPrestador, idServiceRequest];
    
    try {
        const [results] = await connection.execute(query, values);
        return results;
    } catch (err) {
        console.error('Error creating budget:', err); // Log the error
        throw err;
    }
};

// Obtener un presupuesto por su ID
const getBudgetById = async (id) => {
    const query = 'SELECT * FROM budget WHERE id = ?';
    
    try {
        const [results] = await connection.execute(query, [id]);
        return results[0];
    } catch (err) {
        console.error('Error fetching budget by ID:', err); // Log the error
        throw err;
    }
};

const updateBudget = async (id, user) => {
    const { amount, description, status, idPrestador, idServiceRequest } = budget;
    const query = 'UPDATE prestadores SET amount = ?, description = ?, status = ?, idPrestador = ?, idServiceRequest = ? WHERE id = ?';
    const values = [ amount, description, status, idPrestador, idServiceRequest, id];
    
    try {
        const [results] = await connection.execute(query, values);
        return results;
    } catch (err) {
        console.error('Error updating Budget:', err); // Log the error
        throw err;
    }
};

// Obtener presupuestos por prestador
const getBudgetsByPrestador = async (service) => {
    const query = 'SELECT * FROM prestadores WHERE idPrestador = ?'; // Asegúrate de que la columna de la base de datos se llama "IdPrestador"
    
    try {
        const [results] = await connection.execute(query, [service]);
        return results;
    } catch (err) {
        console.error('Error fetching budgets by Prestador:', err);
        throw err;
    }
};

// Eliminar un prestador por su ID
const deleteBudget = async (id) => {
    const query = 'DELETE FROM budget WHERE id = ?';
    
    try {
        const [results] = await connection.execute(query, [id]);
        return results;
    } catch (err) {
        console.error('Error deleting budget:', err); // Log the error
        throw err;
    }
};

module.exports = {
    createBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget,
    getBudgetsByPrestador
};