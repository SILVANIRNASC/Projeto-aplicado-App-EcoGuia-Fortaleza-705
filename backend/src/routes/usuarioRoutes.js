const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

// Define as URLs
router.post('/cadastrar', usuarioController.criarUsuario);
router.post('/login', usuarioController.login);

router.use(authMiddleware);

// router.get('/', usuarioController.listarUsuarios);
router.get('/:id', usuarioController.buscarUsuarioPorId);
router.put('/:id', usuarioController.atualizarUsuario);
module.exports = router;