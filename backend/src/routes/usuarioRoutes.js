const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Define as URLs
router.get('/', usuarioController.listarUsuarios);
router.post('/cadastrar', usuarioController.criarUsuario);
router.get('/:id', usuarioController.buscarUsuarioPorId);
router.put('/:id', usuarioController.atualizarUsuario);
module.exports = router;