const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // El token se pasa en la cabecera Authorization como "Bearer <token>"

  if (!token) {
    return res.status(401).send('Acceso no autorizado');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Token inválido');
    }
    req.user = user;  // Aquí puedes asociar el usuario del token a la solicitud
    next();
  });
}