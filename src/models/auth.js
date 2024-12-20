const connection = require('../config/database');
const bcrypt = require('bcrypt');

const authenticateUser = async (mail, password) => {
  const userQuery = 'SELECT * FROM users WHERE mail = ?';
  const providerQuery = 'SELECT * FROM prestadores WHERE mail = ?';
  
  try {
      // Intentar autenticarse como usuario
      let [results] = await connection.execute(userQuery, [mail]);
      let user = results[0];

      // Si no hay un usuario, intentar como prestador
      if (!user) {
          [results] = await connection.execute(providerQuery, [mail]);
          user = results[0];
      }

      // Si aún no se encuentra el usuario, lanzar un error
      if (!user) {
          throw new Error('Credenciales incorrectas');
      }

      // Comparar la contraseña proporcionada con la almacenada
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          throw new Error('Credenciales incorrectas');
      }

      // Devolver el usuario autenticado incluyendo el tipo
      return {
          name: user.name,
          mail: user.mail,
          phone: user.phone, // Asegúrate de que este campo esté en la tabla de usuarios/prestadores
          address: user.address,
          service: user.service || null, // Devolver el servicio si existe
          type: user.service ? 'prestador' : 'usuario' // Establecer el tipo
      };

  } catch (err) {
      console.error('Error authenticating user:', err);
      throw err;
  }
};


const hashExistingPasswords = async () => {
    try {
      // Obtener todos los usuarios y prestadores de la base de datos
      const [users] = await connection.execute('SELECT mail, password FROM users');
      const [prestadores] = await connection.execute('SELECT mail, password FROM prestadores');
  
      // Función para procesar los usuarios o prestadores
      const processPasswords = async (usersOrPrestadores, tableName) => {
        for (const user of usersOrPrestadores) {
          const { mail, password } = user;
  
          // Verificar si la contraseña ya está hasheada
          if (password.length === 60 && password.startsWith('$2b$')) {
            console.log(`La contraseña del ${tableName} con mail ${mail} ya está hasheada.`);
            continue; // Si ya está hasheada, saltar al siguiente
          }
  
          // Hashear la contraseña
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(password, saltRounds);
  
          // Actualizar la contraseña en la base de datos
          await connection.execute(`UPDATE ${tableName} SET password = ? WHERE mail = ?`, [hashedPassword, mail]);
  
          console.log(`Contraseña para el ${tableName} con mail ${mail} ha sido actualizada.`);
        }
      };
  
      // Procesar contraseñas de usuarios y prestadores
      await processPasswords(users, 'users');
      await processPasswords(prestadores, 'prestadores');
  
      console.log('Actualización completada.');
    } catch (error) {
      console.error('Error actualizando contraseñas:', error);
    }
  };

  
  hashExistingPasswords();
  
  module.exports = {
    authenticateUser,
    hashExistingPasswords
};