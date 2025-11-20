const express = require('express');
const router = express.Router();
const dicaController = require('../controllers/dicaController');

// POST: Publicar uma nova dica
router.post('/', dicaController.criarDica);

// GET: Listar todas as dicas da comunidade
router.get('/', dicaController.listarDicas);

module.exports = router;