const express = require('express');
const router = express.Router();
const pontoController = require('../controllers/pontoController');

// GET /api/pontos -> Lista todos os ecopontos
router.get('/', pontoController.listarPontos);

module.exports = router;