const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Bienvenido a la API');
});

module.exports = router;
