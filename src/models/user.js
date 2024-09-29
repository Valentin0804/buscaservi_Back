const connection = require('../config/database');
const bcrypt = require('bcrypt');

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

const authenticateUser = async (mail, password) => {
    const query = 'SELECT * FROM users WHERE mail = ?';
    
    try {
        const [results] = await connection.execute(query, [mail]);
        
        if (results.length === 0) {
            throw new Error('Credenciales incorrectas');
        }

        const user = results[0];

        // Comparar la contraseña proporcionada con la almacenada
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Credenciales incorrectas');
        }

        return user; // Devolver el usuario autenticado
    } catch (err) {
        console.error('Error authenticating user:', err);
        throw err;
    }
};

const hashExistingPasswords = async () => {
  try {
    // Obtener todos los usuarios de la base de datos
    const [users] = await connection.execute('SELECT mail, password FROM users');
    
    for (const user of users) {
      const { mail, password } = user;

      // Verificar si la contraseña ya está hasheada (opcional)
      // Puedes ignorar este paso si sabes que todas están sin hashear.
      if (password.length === 60 && password.startsWith('$2b$')) {
        console.log(`La contraseña del usuario con mail ${mail} ya está hasheada.`);
        continue;  // Si la contraseña ya está hasheada, pasar al siguiente usuario
      }

      // Hashear la contraseña
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Actualizar la contraseña en la base de datos
      await connection.execute('UPDATE users SET password = ? WHERE mail = ?', [hashedPassword, mail]);

      console.log(`Contraseña para el usuario con mail ${mail} ha sido actualizada.`);
    }

    console.log('Actualización completada.');
  } catch (error) {
    console.error('Error actualizando contraseñas:', error);
  }
};

hashExistingPasswords();


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    authenticateUser,
    hashExistingPasswords,
    deleteUser
};

