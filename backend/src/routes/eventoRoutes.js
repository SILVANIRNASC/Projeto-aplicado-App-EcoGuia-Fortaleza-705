const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');

router.get('/', eventoController.listarEventos);
router.post('/', eventoController.criarEvento);
router.post('/:id_evento/participar', eventoController.togglePresenca);
router.get('/:id_evento/participantes', eventoController.listarParticipantes);

module.exports = router;