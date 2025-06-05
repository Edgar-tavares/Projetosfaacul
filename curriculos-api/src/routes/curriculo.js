const express = require('express');
const router = express.Router();
const controller = require('../controllers/curriculoController');

router.get('/', controller.getTodosCurriculos);
router.get('/:id', controller.getCurriculoPorId);
router.post('/', controller.criarCurriculo);
router.put('/:id', controller.atualizarCurriculo);
router.delete('/:id', controller.deletarCurriculo);

module.exports = router;
