const connection = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticateUser = async (mail, password) => {
    const userQuery = 'SELECT * FROM users WHERE mail = ?';
    const providerQuery = 'SELECT * FROM prestadores WHERE mail = ?';
    
    try {
        // Intentar autenticarse como usuario
        console.log('Buscando usuario con correo:', mail)
        let [results] = await connection.execute(userQuery, [mail]);
        let user = results[0];
        console.log('Resultado de búsqueda de usuario:', user)

        // Si no hay un usuario, intentar como prestador
        if (!user) {
          console.log('No se encontró usuario, buscando como prestador...');
          [results] = await connection.execute(providerQuery, [mail]);
          user = results[0];
          console.log('Resultado de búsqueda de prestador:', user);
        }

        // Si aún no se encuentra el usuario, lanzar un error
        if (!user) {
          console.log('No se encontraron credenciales válidas.');
          throw new Error('Credenciales incorrectas');
        }

        // Comparar la contraseña proporcionada con la almacenada
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          console.log('Contraseña incorrecta.');
          throw new Error('Credenciales incorrectas');
        }

        console.log('Usuario autenticado con éxito:', user);
        //Generar el token
        /*const token = jwt.sign(
          { id: user.id, mail: user.mail }, 
          process.env.JWT_SECRET,  
          { expiresIn: '1h' }  // Opcional, para ajustar el tiempo de expiracion
      );*/
        return {user/*,token*/}; // Devolver el usuario autenticado y el token
    } catch (err) {
        console.error('Error authenticating user:', err);
        throw err;
    }
};
// Función para realizar login
/*const login = async (req, res) => {
  const { mail, password } = req.body;

  try {
      const { user, token } = await authenticateUser(mail, password);
      res.json({ user, token });  // Devolver los datos del usuario y el token
  } catch (err) {
      res.status(401).send('Credenciales incorrectas');
  }
};*/

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