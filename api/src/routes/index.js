const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

 

router.use('/', (req, res) => {
    res.status(200).send({message: "Ruta principal conectada exitosamente"})
})

module.exports = router;