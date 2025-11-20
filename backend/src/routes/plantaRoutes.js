const express = require('express');
const router = express.Router();
const plantaController = require('../controllers/plantaController');

// POST: Cadastra planta
router.post('/', plantaController.criarPlanta);

// GET: Lista plantas de um usuário específico (ex: /api/plantas/usuario/1)
router.get('/usuario/:id_usuario', plantaController.listarPlantasPorUsuario);

// PUT para atualizar a data da rega
router.put('/:id_planta/cuidado', plantaController.registrarCuidado);


module.exports = router;