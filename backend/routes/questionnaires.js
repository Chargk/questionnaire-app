const express = require('express');
const router = express.Router();
const questionnaireController = require('../controllers/questionnaire.controller');

router.get('/', questionnaireController.getAllQuestionnaires);
router.post('/', questionnaireController.createQuestionnaire);
router.get('/:id', questionnaireController.getQuestionnaire);
router.put('/:id', questionnaireController.updateQuestionnaire);
router.delete('/:id', questionnaireController.deleteQuestionnaire);
router.post('/:id/submit', questionnaireController.submitQuestionnaire);
router.get('/:id/statistics', questionnaireController.getStatistics);

module.exports = router; 